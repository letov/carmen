import { Injectable } from "@nestjs/common";
import { FileUpload } from "../customer/dto/file-upload";
import { createWriteStream, unlinkSync } from "fs";
import imageType from "image-type";
import * as uniqueFilename from "unique-filename";
import * as fs from "fs";
const sharp = require('sharp');

@Injectable()
export class FileService {
    constructor() {
    }
    private validateMimeType(mimetype): boolean {
        const validMimeTypes = process.env.UPLOAD_VALID_MIME_TYPES
            .replace(/'/g, '')
            .split(' ');
        return validMimeTypes.includes(mimetype);
    }
    uploadImage(image: Promise<FileUpload>): Promise<string> {
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
                    writeStream.on('finish', () => resolve(uniqFilePath));
                })
            })
    }
    private async readChunk(path: string, n: number): Promise<Buffer> {
        const chunks = [];
        for await (let chunk of fs.createReadStream(path, {start: 0, end: n})) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    }
    validateImageType(imagePath: string): Promise<string> {
        return this.readChunk(imagePath, 12)
            .then((chunk) => {
                const { mime } = imageType(chunk);
                return this.validateMimeType(mime)
                    ? Promise.resolve(imagePath)
                    : Promise.reject('Invalid image type');
            });
    }
    convertToPNG(imagePath: string): Promise<string> {
        const uniqFilePath = uniqueFilename(`${process.cwd()}/${process.env.UPLOAD_PATH}`) + '.png';
        return sharp(imagePath)
            .resize(Number(process.env.UPLOAD_IMAGE_SIZE))
            .png()
            .toFile(uniqFilePath)
            .then(() => uniqFilePath);
    }
}