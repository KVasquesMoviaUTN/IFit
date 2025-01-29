import { Injectable } from '@nestjs/common';
import { AddCartDto } from './dto/add-cart.dto';
import { ProductsService } from 'src/products/products.service';

export interface CartItem {
  productId: number;
  quantity: number;
}

@Injectable()
export class CartService {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  private cart: CartItem[] = [];

  async addToCart(addCartDto: AddCartDto): Promise<void> {
    const existingItem = this.cart.find(item => item.productId === addCartDto.productId);

    if (existingItem) {
      existingItem.quantity += addCartDto.quantity;
    } else {
      this.cart.push({ productId: addCartDto.productId, quantity: addCartDto.quantity });
    }
  }

  async updateCartItem(productId: string, quantity: number) {
    const itemIndex = this.cart.findIndex(item => item.productId === parseInt(productId));

    if (itemIndex !== -1) {
      this.cart[itemIndex].quantity = quantity;

      return this.cart[itemIndex];
    }
    return null;
  }

  getCart(): Promise<CartItem[]> {
    return Promise.resolve(this.cart);
  }

  removeFromCart(productId: number): Promise<void> {
    this.cart = this.cart.filter(item => item.productId !== productId);
    return Promise.resolve();
  }




  
}
