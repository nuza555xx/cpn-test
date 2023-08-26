import { Inject, Injectable, Logger } from '@nestjs/common';
import { UploadService } from './upload.abstract';
import { ClientProxy } from '@nestjs/microservices';
import { FileUpload } from './upload.interface';
import { MAILER_SERVICE_PROVIDER } from './upload.constant';

@Injectable()
export class Upload implements UploadService {
  private readonly logger = new Logger(Upload.name);

  constructor(@Inject(MAILER_SERVICE_PROVIDER) private readonly client: ClientProxy) { }

  async uploadFile(file: FileUpload): Promise<void> {
    try {
      this.client.emit('send.mailer', file);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
