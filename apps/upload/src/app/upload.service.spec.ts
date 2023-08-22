import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';

import { Upload, } from './upload.service';
import { UploadService } from './upload.abstract';
import { ClientProxy } from '@nestjs/microservices';
import { MAILER_SERVICE_PROVIDER } from './upload.constant';

describe('AppService', () => {
  let service: UploadService;
  let clientProxy: ClientProxy;
  let moduleRef: TestingModule;


  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UploadService,
          useClass: Upload
        },
        {
          provide: MAILER_SERVICE_PROVIDER,
          useValue: { emit: jest.fn() },
        }
      ],
    }).compile();

    service = moduleRef.get<UploadService>(UploadService);
    clientProxy = moduleRef.get<ClientProxy>(MAILER_SERVICE_PROVIDER);
  });

  afterAll(async () => {
    await moduleRef.close();
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should emit a mailer event with the file', async () => {
      const fileUpload = {
        fieldname: "file",
        originalname: "test",
        encoding: "7bit",
        mimetype: "application/json",
        destination: "test",
        filename: 'test',
        path: 'test',
        size: 321
      }

      await service.uploadFile(fileUpload);

      expect(clientProxy.emit).toHaveBeenCalledWith('send.mailer', fileUpload);
    });
  });
});
