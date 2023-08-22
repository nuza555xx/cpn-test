import { Logger, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { UploadModule } from './app/upload.module';
import helmet from 'helmet';

class Bootstrap {
  private readonly logger = new Logger(Bootstrap.name)
  private readonly globalPrefix = 'api';

  private setSwagger(app: NestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Upload')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(this.globalPrefix, app, document);
  }

  private setPrefix(app: NestApplication) {
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
  }

  private setValidate(app: NestApplication) {
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  }

  private setHelmet(app: NestApplication) {
    app.use(helmet({ contentSecurityPolicy: true }));
  }

  async starter() {
    const app = await NestFactory.create<NestApplication>(UploadModule);
    app.enableCors();

    this.setPrefix(app);
    this.setSwagger(app);
    this.setValidate(app);
    this.setHelmet(app)

    const port = 3000;
    await app.listen(port);

    this.logger.log(`🚀 Application is running on: ${await app.getUrl()}/${this.globalPrefix}`);
  }
}

(async () => await new Bootstrap().starter())()

