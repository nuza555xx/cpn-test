import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer.service';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';


const mockTransporter = {
    sendMail: jest.fn(),
}

jest.mock('nodemailer', () => ({
    createTransport: jest.fn(() => mockTransporter),
}));

describe('MailerService', () => {
    let mailerService: MailerService;
    let moduleRef: TestingModule;

    const mockConfigService = {
        get: jest.fn(),
    };

    const mockLogger = {
        log: jest.fn(),
        error: jest.fn(),
    };

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            providers: [
                MailerService,
                {
                    provide: ConfigService,
                    useValue: mockConfigService,
                },
                {
                    provide: Logger,
                    useValue: mockLogger,
                },

            ],
        }).compile();

        mailerService = moduleRef.get<MailerService>(MailerService);
    });

    afterAll(async () => {
        jest.clearAllMocks();
        await moduleRef.close();
    })

    describe('sendUploadSuccessAlert', () => {
        it('should send an email with the provided information', async () => {
            const fileInfo = {
                fileName: 'example.txt',
                uploadDate: '2023-08-26',
            };
            const recipientEmail = 'recipient@example.com';

            mockConfigService.get.mockReturnValue({});

            await mailerService.sendUploadSuccessAlert(fileInfo, recipientEmail);

            expect(mockTransporter.sendMail).toHaveBeenCalledWith({
                from: process.env.SMTP_USER,
                to: recipientEmail,
                subject: 'File Upload Successful',
                text: expect.stringContaining('Dear Recipient,'),
            });
        });

        it('should log an error if sending email fails', async () => {
            const fileInfo = {
                fileName: 'example.txt',
                uploadDate: '2023-08-26',
            };
            const recipientEmail = 'recipient@example.com';

            mockConfigService.get.mockReturnValue({});

            const loggerLogSpy = jest.spyOn(mailerService['logger'], 'error');

            mockTransporter.sendMail.mockRejectedValue(new Error('Failed to send email'));

            await mailerService.sendUploadSuccessAlert(fileInfo, recipientEmail);

            expect(loggerLogSpy).toHaveBeenCalledTimes(1);

        });
    });
});


