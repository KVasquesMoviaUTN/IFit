import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from './entities/sale-detail.entity';
import { SalesController } from './sales.controller';
import { ProductsModule } from 'src/products/products.module';
import { SaleStatus } from './entities/sale-status.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { Users } from 'src/users/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Sale, SaleDetail, SaleStatus, PaymentMethod, Users]), ProductsModule],
  providers: [SalesService],
  controllers: [SalesController],
  exports: [SalesService]
})
export class SalesModule {}
