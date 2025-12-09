import { Controller, Get, Post, Query, BadRequestException, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { StorageService } from './storage.service';

@Controller('upload')
export class StorageController {
  constructor(private readonly cloudinaryService: StorageService) {}

  @Get('from-directory')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async uploadFromDirectory(@Query('path') directoryPath: string) {
    if (!directoryPath) {
      throw new BadRequestException('Debe proporcionar una ruta válida');
    }
    return this.cloudinaryService.uploadImagesFromDirectory(directoryPath);
  }

  @Post('file')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: MulterFile) {
    if (!file) {
      throw new BadRequestException('No se ha proporcionado ningún archivo');
    }
    return this.cloudinaryService.uploadFile(file);
  }
}
