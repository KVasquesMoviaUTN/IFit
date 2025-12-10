import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { CreatePreferenceDto } from './create-preference.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class MercadoPagoService {
  private readonly logger = new Logger(MercadoPagoService.name);

  constructor(private readonly productsService: ProductsService) {}

  async createPreference(createPreferenceDto: CreatePreferenceDto) {
    this.logger.log(`Creating MercadoPago preference for items: ${JSON.stringify(createPreferenceDto.items)}`);
    
    const { items } = createPreferenceDto;
    
    if (!items || items.length === 0) {
      throw new BadRequestException('El carrito no puede estar vacío');
    }

    // Calculate total price using ProductsService to ensure accuracy and apply discounts
    let totalPrice = 0;
    try {
      totalPrice = await this.productsService.getTotalFinalPrice(items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        presentationId: item.presentationId
      })));
    } catch (error) {
      this.logger.error(`Error calculating total price: ${error.message}`);
      throw new BadRequestException('Error al calcular el precio total. Verifique los productos.');
    }

    if (totalPrice <= 0) {
      throw new BadRequestException('El precio total debe ser mayor a 0');
    }

    this.logger.log(`Calculated total price: ${totalPrice}`);

    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN ?? '' });
    const preference = new Preference(client);

    try {
      const data = await preference.create({
        body: {
          items: [
            {
              id: "1", // Single item representing the cart total
              quantity: 1,
              unit_price: totalPrice,
              title: 'Compra en Dietetica Modo Fit',
              currency_id: 'ARS'
            }
          ],
          // back_urls: {
          //   success: 'http://localhost:8080/thanks',
          //   failure: 'http://localhost:8080/failure',
          //   pending: 'http://localhost:8080/pending'
          // },
          // auto_return: 'approved'
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
