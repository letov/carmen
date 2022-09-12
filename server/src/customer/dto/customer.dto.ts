import { IsOptional, IsPhoneNumber, Length } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { localeConfig } from "../../config/locale.config";
import { CountryCode } from "libphonenumber-js";
import { FileUpload } from "./file-upload";
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class CustomerInput {
    @Field()
    @Length(3, 50)
    name: string;
    @Field()
    @IsPhoneNumber(<CountryCode>localeConfig.region)
    phone: string;
    @Field(() => GraphQLUpload, { nullable: true })
    @IsOptional()
    uploadImage?: Promise<FileUpload>;
 }