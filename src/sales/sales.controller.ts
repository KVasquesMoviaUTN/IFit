import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateSaleDto } from './create-sale.dto';
import { Sale } from './entities/sale.entity';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.salesService.create(createSaleDto);
  }
}
