import { Controller, MaxFileSizeValidator, ParseFilePipe, UploadedFile, Post, UseInterceptors } from '@nestjs/common';
import { Express } from 'express';
import { MAX_SIZE_FILE } from './upload.constant';
import { UploadService } from './upload.abstract';
import { UploadFileDto } from './upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller({ path: 'upload' })
export class UploadController {
  constructor(private readonly upload: UploadService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [new MaxFileSizeValidator({ maxSize: MAX_SIZE_FILE })]
  })) file: Express.Multer.File) {
    return this.upload.uploadFile(file);
  }
}
