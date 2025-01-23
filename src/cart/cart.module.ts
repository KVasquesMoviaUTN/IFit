import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController], // Registra el controlador
  providers: [CartService],      // Registra el servicio
})
export class CartModule {}
