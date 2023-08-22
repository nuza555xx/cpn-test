import { Inject, Injectable } from '@nestjs/common';
import { UploadService } from './upload.abstract';
import { ClientProxy } from '@nestjs/microservices';
import { FileUpload } from './upload.interface';
import { MAILER_SERVICE_PROVIDER } from './upload.constant';

@Injectable()
export class Upload implements UploadService {

  constructor(@Inject(MAILER_SERVICE_PROVIDER) private readonly client: ClientProxy) { }

  async uploadFile(file: FileUpload): Promise<void> {
    this.client.emit('send.mailer', file);
  }
}
