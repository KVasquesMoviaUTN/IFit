import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { UploadedFile, MulterFile } from 'multer';
// import { MulterFile } from '../types/multer-file.type';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImageFromPath(filePath: string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) {
        return reject(new Error(`El archivo no existe: ${filePath}`));
      }
  
      const fileSize = fs.statSync(filePath).size;
      if (fileSize === 0) {
        return reject(new Error(`El archivo está vacío: ${filePath}`));
      }
  
      const fileName = path.basename(filePath, path.extname(filePath));
      const fileExtension = path.extname(filePath).replace('.', '');
  
      const fileStream = fs.createReadStream(filePath);
  
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: fileName,
          resource_type: 'image',
          format: fileExtension,
          overwrite: true,
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Error uploading image to Cloudinary'));
          }
          resolve(result);
        }
      );
  
      fileStream.pipe(uploadStream);
    });
  }

  async uploadFile(file: MulterFile): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      // Extract filename without extension to use as public_id
      const fileName = path.parse(file.originalname).name;
      
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'products',
          format: 'webp', // Force conversion to WebP
          public_id: fileName, // Use original filename
          overwrite: true, // Overwrite if exists with same name
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Error uploading image to Cloudinary'));
          }
          resolve(result);
        }
      );

      uploadStream.end(file.buffer);
    });
  }
  

  async uploadImagesFromDirectory(directoryPath: string): Promise<UploadApiResponse[]> {
    const files = fs.readdirSync(directoryPath); // Leer todos los archivos del directorio
    const imageFiles = files.filter(file => /\.(webp)$/i.test(file)); // Filtrar imágenes

    const uploadPromises = imageFiles.map(file => {
      const filePath = path.join(directoryPath, file);
      return this.uploadImageFromPath(filePath);
    });

    return Promise.all(uploadPromises); // Esperar a que todas las imágenes suban
  }
}
