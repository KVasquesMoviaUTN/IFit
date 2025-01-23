import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CartItemDto } from 'src/cart/dto/cart-item.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    return this.productsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | null> {
    await this.productsRepository.update(id, updateProductDto);
    return this.productsRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }

  async getPrice(id: number, quantity: number): Promise<number | null> {
    const product = await this.productsRepository.findOne({ where: { id } });
  
    if (!product) 
      throw new Error(`Product with id ${id} not found`);

    return this.calculateDiscount(product.price, quantity)
  }

  async getTotalPrice(cart: { price: number, quantity: number }[]): Promise<number | null> {
    let totalPrice = 0;

    cart.forEach(product => {
      totalPrice += product.price * product.quantity;
    });

    return Math.round(totalPrice);
  }

  async getTotalFinalPrice(cart: { price: number, quantity: number }[]): Promise<number | null> {
    let totalPrice = 0;

    cart.forEach(product => {
      totalPrice += this.calculateDiscount(product.price, product.quantity);
    });

    return totalPrice;
  }

  private calculateDiscount(price: number, quantity: number): number {
    return Math.round((quantity > 9) ? price * quantity * (1 - parseFloat(process.env.DESCUENTO ?? "0")) : price * quantity);
  }
}
