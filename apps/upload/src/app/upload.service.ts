import { Inject, Injectable } from '@nestjs/common';
import { UploadService } from './upload.abstract';
import { ClientProxy } from '@nestjs/microservices';
import { FileUpload } from './upload.interface';

@Injectable()
export class Upload implements UploadService {

  constructor(
    @Inject('MAILER_SERVICE') private client: ClientProxy
  ) { }

  async uploadFile(file: FileUpload): Promise<void> {
    
    this.client.emit('send.mailer', file);
  }
}
