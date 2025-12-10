import { Controller, Post, Body, Get, Logger } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { CreatePreferenceDto } from './create-preference.dto';

@Controller('payment')
export class MercadoPagoController {
  private readonly logger = new Logger(MercadoPagoController.name);

  constructor(private readonly mercadopagoService: MercadoPagoService) {}

  @Post()
  async createPreference(@Body() createPreferenceDto: CreatePreferenceDto) {
    this.logger.log('Received request to create payment preference');
    const preference = await this.mercadopagoService.createPreference(createPreferenceDto);
    return preference;
  }
}
