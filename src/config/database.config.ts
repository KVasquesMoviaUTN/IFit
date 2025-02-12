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

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // username: 'kalil',
  // password: 'fattyshady',
  // database: 'IFit',
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  url: process.env.DATABASE_URL,
  // url: 'postgresql://neondb_owner:npg_B4jdtyJ9wHSf@ep-fragrant-cherry-a5og2mdt-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  entities: [Product, Category, Presentation, User, Users, Sale, SaleDetail, SaleStatus, PaymentMethod, ],
  autoLoadEntities: true,//
  synchronize: false,//false en produccion
  ssl: {
    rejectUnauthorized: false,
  },
};