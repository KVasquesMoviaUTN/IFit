// import { CartModule } from './cart/cart.module'; 
import { AuthModule } from './auth/auth.module';
import { ConfigController } from './config/config.controller';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';

import { MercadoPagoModule } from './payments/mercado-pago.module';
import { Module } from '@nestjs/common';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { AnalyticsModule } from './analytics/analytics.module';

import { StorageModule } from './storage/storage.module';
import { ShiftsModule } from './shifts/shifts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('ModoFit', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        ...(process.env.NODE_ENV !== 'production'
          ? [
              new DailyRotateFile({
                dirname: 'logs',
                filename: 'application-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                format: winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.json(),
                ),
              }),
            ]
          : []),
      ],
    }),
    TypeOrmModule.forRoot(databaseConfig),
    MercadoPagoModule,
    ProductsModule,
    UsersModule,
    StorageModule,
    SalesModule,
    AnalyticsModule,
    AuthModule,
    ShiftsModule,
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ConfigController],
})
export class AppModule {}