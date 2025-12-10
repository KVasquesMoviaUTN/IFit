import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from './entities/sale-detail.entity';
import { SalesController } from './sales.controller';
import { ProductsModule } from 'src/products/products.module';


import { Users } from 'src/users/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { MercadoPagoModule } from 'src/payments/mercado-pago.module';
import { SalesStatisticsService } from './sales-statistics.service';
import { SalesStatisticsController } from './sales-statistics.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Sale, SaleDetail, Users, Product]), ProductsModule, MercadoPagoModule],
  providers: [SalesService, SalesStatisticsService],
  controllers: [SalesController, SalesStatisticsController],
  exports: [SalesService]
})
export class SalesModule {}
