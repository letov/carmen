import { Injectable } from "@nestjs/common";
import { FileUpload } from "../customer/dto/file-upload";
import { createWriteStream, unlinkSync } from "fs";
import imageType from "image-type";
import * as FirstChunkStream from "first-chunk-stream";
import * as uniqueFilename from "unique-filename";
const sharp = require('sharp');

@Injectable()
export class FileService {
    constructor() {
    }
    private validateMimeType(mimetype): boolean {
        const validMimeTypes = process.env.UPLOAD_VALID_MIME_TYPES.split(' ');
        return validMimeTypes.includes(mimetype);
    }
    async uploadImage(image: Promise<FileUpload>): Promise<string> {
        const uniqFilePath = uniqueFilename(process.env.UPLOAD_TMP_PATH);
        return image
            .then(({ createReadStream, mimetype }) => {
                if (!this.validateMimeType(mimetype)) {
                    return Promise.reject('Invalid image type');
                }
                const readStream = createReadStream();
                const writeStream = createWriteStream(uniqFilePath);
                return new Promise((resolve, reject) => {
                    writeStream.on('error', () => reject('File write error'));
                    readStream.on('error', () => reject('File read error'));
                    readStream.pipe(writeStream);
                    readStream.pipe(new FirstChunkStream({ chunkSize: 12 }, async (chunk) => {
                        const { mime } = imageType(chunk);
                        if (!this.validateMimeType(mime)) {
                            reject('Invalid image type');
                        }
                        return chunk;
                    }));
                    writeStream.on('finish', () => resolve(uniqFilePath));
                })
            })
    }
    async convertToPNG(imagePath: string): Promise<string> {
        const uniqFilePath = uniqueFilename(`${process.cwd()}/${process.env.UPLOAD_PATH}`) + '.png';
        return sharp(imagePath)
            .resize(Number(process.env.UPLOAD_IMAGE_SIZE))
            .png()
            .toFile(uniqFilePath)
            .then(() => uniqFilePath);
    }
}