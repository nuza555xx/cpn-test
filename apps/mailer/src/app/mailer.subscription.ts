import { EventPattern, Payload } from '@nestjs/microservices';
import { MailerService } from './mailer.service';
import { Controller } from '@nestjs/common';

@Controller()
export class MailerSubscription {
  constructor(private readonly mailer: MailerService) {
  }

  @EventPattern('send.mailer')
  async handleBookCreatedEvent(@Payload() data: Express.Multer.File) {
    this.mailer.sendUploadSuccessAlert({
      fileName: data.originalname,
      uploadDate: new Date().toISOString()
    }, 'nuchaiwongthon@gmail.com')
  }
}
