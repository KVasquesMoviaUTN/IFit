import { config } from 'dotenv';

import { Users } from 'src/users/user.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Category } from 'src/products/entities/category.entity';
import { SaleDetail } from 'src/sales/entities/sale-detail.entity';

import { Presentation } from 'src/products/entities/presentation.entity';

import { ProductImage } from 'src/products/entities/product-image.entity';
import { ProductPriceHistory } from 'src/products/entities/product-price-history.entity';
import { UserActivity } from 'src/analytics/entities/user-activity.entity';
import { TypeOrmLogger } from './typeorm-logger';

config();
const isProduction = process.env.NODE_ENV === 'production';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: isProduction ? process.env.DATABASE_URL : 'postgresql://kalil:fattyshady@localhost:5432/IFit',
  entities: [Product, ProductImage, Category, Presentation, Users, Sale, SaleDetail, ProductPriceHistory, UserActivity],
  synchronize: !isProduction,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  logger: new TypeOrmLogger(),
  logging: 'all',
};