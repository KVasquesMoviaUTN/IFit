// import { Controller, Post, Put, Body, Get, Delete, Param } from '@nestjs/common';
// import { CartService } from './cart.service';
// import { AddCartDto } from './dto/add-cart.dto';
// import { CartItem } from './cart.service';


// @Controller('cart')
// export class CartController {
//   constructor(private readonly cartService: CartService) {}

//   @Post()
//   addToCart(@Body() addCartDto: AddCartDto): Promise<void> {
//     return this.cartService.addToCart(addCartDto);
//   }

//   @Put(':productId')
//   async updateCartItem(@Param('productId') productId: string, @Body() body: { quantity: number }) {
//     const updatedItem = await this.cartService.updateCartItem(productId, body.quantity);
//     if (!updatedItem) {
//       return { message: 'Item no encontrado en el carrito' };
//     }
//     return updatedItem;
//   }

//   // @Get()
//   // findAll(): Promise<CartItem[]> {
//   //   return this.cartService.findAll();
//   // }
// }
