import { config } from 'dotenv';
import { User } from 'mercadopago';
import { Users } from 'src/users/user.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Category } from 'src/products/entities/category.entity';
import { SaleDetail } from 'src/sales/entities/sale-detail.entity';
import { SaleStatus } from 'src/sales/entities/sale-status.entity';
import { Presentation } from 'src/products/entities/presentation.entity';
import { PaymentMethod } from 'src/sales/entities/payment-method.entity';

config();
const isProduction = process.env.NODE_ENV === 'production';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: isProduction ? process.env.DATABASE_URL : 'postgresql://kalil:fattyshady@localhost:5432/IFit',
  entities: [Product, Category, Presentation, User, Users, Sale, SaleDetail, SaleStatus, PaymentMethod, ],
  synchronize: false,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
};