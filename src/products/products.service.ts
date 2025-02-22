import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
    return this.productsRepository.find({
      relations: ['presentation'],
      order: { display_order: 'DESC' },
    });
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

  async getPrice(id: number, quantity: number, presentationId?: number): Promise<number> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['presentation']
    });  

    if (!product) 
      throw new Error(`Product with id ${id} not found`);

    let price: number;

    if (presentationId) {
      const presentation = product.presentation.find(p => p.id === presentationId);
      
      if (!presentation) 
        throw new Error(`Presentation with id ${presentationId} not found for product ${id}`);
  
      price = presentation.price;
    } else {
      price = product.price;
    }

    return Math.round(this.calculateDiscount(price, quantity));
  }

  async getTotalPrice(cart: { productId: number, quantity: number }[]): Promise<number | null> {
    let totalPrice = 0;

    for (const product of cart) {
      const productSafe = await this.findOne(product.productId);
  
      if (!productSafe)
        throw new Error(`Producto con ID ${product.productId} no encontrado`);
  
      totalPrice += Math.round(productSafe.price * product.quantity);
    }

    return Math.round(totalPrice);
  }

  async getTotalFinalPrice(cart: { productId: number, quantity: number }[]): Promise<number> {
    let totalPrice = 0;
  
    for (const product of cart) {
      const productSafe = await this.findOne(product.productId);
  
      if (!productSafe)
        throw new Error(`Producto con ID ${product.productId} no encontrado`);
  
      totalPrice += this.calculateDiscount(productSafe.price, product.quantity);
    }
  
    return Math.round(totalPrice);
  }
  
  private calculateDiscount(price: number, quantity: number): number {
    return Math.round((quantity > 4) ? price * quantity * (1 - parseFloat(process.env.DESCUENTO ?? "0")) : price * quantity);
  }
}
