import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('upload')
export class StorageController {
  constructor(private readonly cloudinaryService: StorageService) {}

  @Get('from-directory')
  async uploadFromDirectory(@Query('path') directoryPath: string) {
		console.log('Ruta recibida en el backend:', directoryPath);
    if (!directoryPath) {
      throw new BadRequestException('Debe proporcionar una ruta válida');
    }
    return this.cloudinaryService.uploadImagesFromDirectory(directoryPath);
  }
}
