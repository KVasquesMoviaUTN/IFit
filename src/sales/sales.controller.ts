import { Controller, Get, Post, Body, Param, Put, Delete, Query, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CreateSaleDto } from './create-sale.dto';
import { Sale } from './entities/sale.entity';
import { SalesService } from './sales.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('sales')
export class SalesController {
  private readonly logger = new Logger(SalesController.name);

  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto )/* : Promise<Sale> */ {
    this.logger.log('Received request to create sale');
    return this.salesService.create(createSaleDto);
  }

  @Post('manual')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async createManual(@Body() createSaleDto: CreateSaleDto) {
    this.logger.log('Received request to create manual sale');
    return this.salesService.createManual(createSaleDto);
  }

  @Post('shipping')
  async shippingCost(@Body() address ): Promise<number> {
    this.logger.log('Received request to calculate shipping cost');
    return this.salesService.getShippingCost(address);
  }
}
