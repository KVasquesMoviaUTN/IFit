import { Controller, Post, Body, Get } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { CreatePreferenceDto } from './create-preference.dto';

@Controller('payment')
export class MercadoPagoController {
  constructor(private readonly mercadopagoService: MercadoPagoService) {}

  @Post()
  async createPreference(@Body() createPreferenceDto: CreatePreferenceDto) {
    const preference = await this.mercadopagoService.createPreference(createPreferenceDto);
    return preference;
  }
}
