import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDto {
    @ApiProperty({
        description: 'The file to be uploaded',
        type: 'string',
        format: 'binary',
        required: true
    })
    file: Express.Multer.File;
}

