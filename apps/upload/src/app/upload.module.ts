import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { Upload } from './upload.service';
import { UploadService } from './upload.abstract';
import { MulterModule } from '@nestjs/platform-express';
import { MAILER_SERVICE_PROVIDER, MAX_SIZE_FILE, customStorage } from './upload.constant';
import { join } from 'path';
import { ConfigurationModule } from '@cpn-test/configs';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ConfigurationModule,
    MulterModule.register({
      dest: join(__dirname, `/uploads`),
      limits: {
        fileSize: MAX_SIZE_FILE,
      },
      storage: customStorage
    }),
    ClientsModule.register([{
      name: MAILER_SERVICE_PROVIDER,
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_MQ_HOST],
        queue: 'mailer',
        queueOptions: {
          durable: true
        }
      }
    }])
  ],
  controllers: [
    UploadController
  ],
  providers: [
    {
      provide: UploadService,
      useClass: Upload
    }
  ],
})
export class UploadModule { }
