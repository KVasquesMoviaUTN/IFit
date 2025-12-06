import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { CreatePreferenceDto } from './create-preference.dto';

@Injectable()
export class MercadoPagoService {
  constructor() {
  }

  async createPreference(createPreferenceDto: CreatePreferenceDto) {
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
      return data;
    } catch (error) {
      // console.error(error);
      return null;
    }
}
}
