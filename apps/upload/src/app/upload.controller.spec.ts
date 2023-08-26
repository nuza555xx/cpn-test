import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.abstract';
import { ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';

describe('UploadController', () => {
  let uploadController: UploadController;
  let moduleRef: TestingModule;

  const mockUploadService = {
    uploadFile: jest.fn(),
  };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        {
          provide: UploadService,
          useValue: mockUploadService,
        },
        ParseFilePipe,
        MaxFileSizeValidator,
      ],
    }).compile();

    uploadController = moduleRef.get<UploadController>(UploadController);
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await moduleRef.close();
  })

  describe('uploadFile', () => {
    it('should call upload service and return result', async () => {
      const mockFile = {} as Express.Multer.File;

      mockUploadService.uploadFile.mockReturnValue('Uploaded successfully');

      const result = await uploadController.uploadFile(mockFile);

      expect(mockUploadService.uploadFile).toHaveBeenCalledWith(mockFile);
      expect(result).toBe('Uploaded successfully');
    });
  });
});
