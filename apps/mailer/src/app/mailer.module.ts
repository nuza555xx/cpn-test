import { Module } from '@nestjs/common';
import { MailerSubscription } from './mailer.subscription';
import { MailerService } from './mailer.service';
import { ConfigurationModule } from '@cpn-test/configs';

@Module({
  imports: [
    ConfigurationModule,
  ],
  controllers: [MailerSubscription],
  providers: [MailerService],
})
export class MailerModule { }
