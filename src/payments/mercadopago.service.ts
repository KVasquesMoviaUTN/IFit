import { Injectable, Logger } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { CreatePreferenceDto } from './create-preference.dto';

@Injectable()
export class MercadoPagoService {
  private readonly logger = new Logger(MercadoPagoService.name);

  constructor() {
  }

  async createPreference(createPreferenceDto: CreatePreferenceDto) {
    this.logger.log(`Creating MercadoPago preference for price: ${createPreferenceDto.price}`);
    const { id, price } = createPreferenceDto;
    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-458209303047483-012118-683ff81c5f2cd5586c5877cd4fb0df89-2222130369' });
    const preference = new Preference(client);

    try {
      const data = await preference.create({
        body: {
          items: [
            {
              id: "1",
              quantity: 1,
              unit_price: price,
              title: 'Dietetica Modo Fit',
              // "category_id": "",
            }
          ],
          // back_urls: [
            // success: 'http:localhost/8080/thanks',
          // ]
        }
      })
      this.logger.log(`Preference created successfully: ${data.id}`);
      return data;
    } catch (error) {
      this.logger.error(`Failed to create preference: ${error.message}`, error.stack);
      return null;
    }
}
}
