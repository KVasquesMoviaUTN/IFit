import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module'; 
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './config/database.config';
import { ProductsModule } from './products/products.module';
import { ConfigController } from './config/config.controller';
import { MercadoPagoModule } from './payments/mercado-pago.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    MercadoPagoModule,
    ProductsModule,
    UsersModule,
    CartModule,
    AuthModule,
  ],
  controllers: [ConfigController],
})
export class AppModule {}