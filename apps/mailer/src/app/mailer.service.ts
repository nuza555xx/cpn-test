import { ConfigurationName, MailerConfig } from '@cpn-test/configs';
import { Injectable, Logger } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import { FileInfo } from './mailer.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private transporter: Transporter;
  constructor(private configService: ConfigService) {
    const config = this.configService.get<MailerConfig>(ConfigurationName.Mailer)
      this.transporter = createTransport(config);
  }

  async sendUploadSuccessAlert(fileInfo: FileInfo, recipientEmail: string) {
    const subject = 'File Upload Successful';
    const text = `
      Dear Recipient,

      I am pleased to inform you that the recent file upload was successful. The file has been securely transferred and is now available in the designated storage location.

      File Name: ${fileInfo.fileName}
      Upload Date: ${fileInfo.uploadDate}

      If you have any questions or concerns regarding this upload, please feel free to reach out.

      Best regards,
      Your Name
      Your Contact Information
    `;

    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: recipientEmail,
        subject,
        text,
      });

    } catch (error) {
      this.logger.error('Error sending email:', error);
    }
  }
}
