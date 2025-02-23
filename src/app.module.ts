import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CartModule } from './cart/cart.module'; 
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './config/database.config';
import { ProductsModule } from './products/products.module';
import { ConfigController } from './config/config.controller';
import { MercadoPagoModule } from './payments/mercado-pago.module';
import { SalesModule } from './sales/sales.module';
import { Product } from './products/entities/product.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    MercadoPagoModule,
    ProductsModule,
    UsersModule,
    // CartModule,
    StorageModule,
    SalesModule,
    AuthModule,
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ConfigController],
})
export class AppModule {}