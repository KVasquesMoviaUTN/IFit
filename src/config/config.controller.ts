import { Controller, Get } from '@nestjs/common';

@Controller('config')
export class ConfigController {
  @Get()
  getConfig() {
    return {
      whatsappNumber: process.env.WHATSAPP_NUMBER,
      cantidadParaDescuento: process.env.CANTIDAD_PARA_DESCUENTO,
      descuento: process.env.DESCUENTO,
    };
  }
}