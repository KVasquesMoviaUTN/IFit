import { Controller, Get, Query, BadRequestException, UseGuards } from '@nestjs/common';
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
}
