import { Controller, Get, Post, Body, Param, Put, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSaleDto } from './create-sale.dto';
import { Sale } from './entities/sale.entity';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto ): Promise<Sale> {
/*     try {
      const success = await this.salesService.create(cart.items);
      if (success) {
        return { success: true, message: 'Compra realizada con éxito!' };
      }
      throw new HttpException('Error al procesar la compra', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
 */
    return this.salesService.create(createSaleDto);

  }
}
