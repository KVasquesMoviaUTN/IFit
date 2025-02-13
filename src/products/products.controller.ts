import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Get('/price/:id')
  getPrice(@Param('id') id: number, @Query('quantity') quantity: number): Promise<number | null> {
    return this.productsService.getPrice(id, quantity);
  }

  @Post('/total')
  getTotalPrice(@Body() body: { cart: { productId: number, quantity: number }[] }): Promise<number | null> {
    return this.productsService.getTotalPrice(body.cart);
  }

  @Post('/finalTotal')
  getTotalFinalPrice(@Body() body: { cart: { productId: number, quantity: number }[] }): Promise<number | null> {
    return this.productsService.getTotalFinalPrice(body.cart);
  }
  

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.delete(id);
  }
}
