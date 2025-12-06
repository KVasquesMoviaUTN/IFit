import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload_stream: jest.fn(),
    },
  },
}));

jest.mock('fs');

describe('StorageService', () => {
  let service: StorageService;
  let mockConfigService;

  beforeEach(async () => {
    mockConfigService = {
      get: jest.fn((key) => {
        if (key === 'CLOUDINARY_CLOUD_NAME') return 'test_cloud';
        if (key === 'CLOUDINARY_API_KEY') return 'test_key';
        if (key === 'CLOUDINARY_API_SECRET') return 'test_secret';
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorageService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadImageFromPath', () => {
    it('should throw error if file does not exist', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      await expect(service.uploadImageFromPath('invalid/path.jpg')).rejects.toThrow('El archivo no existe');
    });

    it('should throw error if file is empty', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.statSync as jest.Mock).mockReturnValue({ size: 0 });
      await expect(service.uploadImageFromPath('empty/file.jpg')).rejects.toThrow('El archivo está vacío');
    });

    it('should upload image successfully', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.statSync as jest.Mock).mockReturnValue({ size: 100 });
      (fs.createReadStream as jest.Mock).mockReturnValue({
        pipe: jest.fn(),
      });

      const mockUploadStream = jest.fn((options, callback) => {
        callback(null, { public_id: 'test_id', url: 'http://test.com/image.jpg' });
        return {};
      });
      (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(mockUploadStream);

      const result = await service.uploadImageFromPath('valid/image.jpg');
      expect(result).toEqual(expect.objectContaining({ public_id: 'test_id' }));
    });
  });
});
