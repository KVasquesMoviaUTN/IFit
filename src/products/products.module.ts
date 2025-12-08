import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { Presentation } from './entities/presentation.entity';
import { ProductPriceHistory } from './entities/product-price-history.entity';
import { AuthModule } from '../auth/auth.module'; // Added import for AuthModule

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, ProductImage, Presentation, ProductPriceHistory]), AuthModule],
  exports: [ProductsService, TypeOrmModule]
})
export class ProductsModule {}
