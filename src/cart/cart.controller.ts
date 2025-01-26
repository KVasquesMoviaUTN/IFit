import { Controller, Post, Put, Body, Get, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/add-cart.dto';
import { CartItem } from './cart.service';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Body() addCartDto: AddCartDto): Promise<void> {
    return this.cartService.addToCart(addCartDto);
  }

  @Put(':productId')
  async updateCartItem(@Param('productId') productId: string, @Body() body: { quantity: number }) {
    const updatedItem = await this.cartService.updateCartItem(productId, body.quantity);
    if (!updatedItem) {
      return { message: 'Item no encontrado en el carrito' };
    }
    return updatedItem;
  }

  @Get()
  getCart(): Promise<CartItem[]> {
    return this.cartService.getCart();
  }

  @Delete(':productId')
  removeFromCart(@Param('productId') productId: number): Promise<void> {
    return this.cartService.removeFromCart(productId);
  }

  @Post('purchase')
  async purchase(@Body() cart: { items: Array<{ price: number, productId: number; quantity: number }> }) {
    try {
      const success = await this.cartService.purchase(cart.items);
      if (success) {
        return { success: true, message: 'Compra realizada con éxito!' };
      }
      throw new HttpException('Error al procesar la compra', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
