import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MailerModule } from './app/mailer.module';
class Bootstrap {
  async starter() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(MailerModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_MQ_HOST],
        queue: 'mailer',
        queueOptions: {
          durable: true
        }
      }
    })
    await app.listen();
  }
}

(async () => await new Bootstrap().starter())()

