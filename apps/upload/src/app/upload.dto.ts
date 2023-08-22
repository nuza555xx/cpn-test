import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMimeType, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class UploadFileDto {
    @ApiProperty({
        description: 'The file to be uploaded',
        type: 'string',
        format: 'binary',
        required: true
    })
    file: Express.Multer.File;
}

