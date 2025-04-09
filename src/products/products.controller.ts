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
  async getProducts(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.productsService.findAll(page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Get('/original-price/:id')
  getOriginaPrice(@Param('id') id: number, @Query('quantity') quantity: number, @Query('presentationId') presentationId?: number): Promise<number | null> {
    return this.productsService.getOriginalPrice(id, quantity, presentationId);
  }

  @Get('/discount-price/:id')
  getDiscountPrice(@Param('id') id: number, @Query('quantity') quantity: number, @Query('presentationId') presentationId?: number): Promise<number | null> {
    return this.productsService.getDiscountPrice(id, quantity, presentationId);
  }

  @Get('/price/:id')
  getPrice(@Param('id') id: number, @Query('quantity') quantity: number, @Query('presentationId') presentationId?: number): Promise<number | null> {
    return this.productsService.getPrice(id, quantity, presentationId);
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
