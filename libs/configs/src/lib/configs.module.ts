import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mailerConfig } from './mailer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        mailerConfig,
      ]
    })
  ],
})
export class ConfigurationModule { }
