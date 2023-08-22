import { Inject, Injectable } from '@nestjs/common';
import { UploadService } from './upload.abstract';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class Upload implements UploadService {

  constructor(
    @Inject('MAILER_SERVICE') private client: ClientProxy
  ) { }

  async uploadFile(file: Express.Multer.File): Promise<void> {
    this.client.emit('send.mailer', file);
  }
}
