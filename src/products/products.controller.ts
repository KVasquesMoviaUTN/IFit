import { Controller, Get, Post, Body, Param, Put, Delete, Query, DefaultValuePipe, ParseIntPipe, UseGuards, Logger } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { Product } from "./entities/product.entity";
import { ProductImage } from "./entities/product-image.entity";

@Controller("products")
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log(`Received request to create product: ${createProductDto.name}`);
    return this.productsService.create(createProductDto);
  }

  @Get()
  async getProducts(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("pageSize", new DefaultValuePipe(20), ParseIntPipe) pageSize: number
  ) {
    this.logger.log(`Received request to get products page ${page}`);
    return this.productsService.findAll(page, pageSize);
  }

  @Get("/new")
  async getNewProducts(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("pageSize", new DefaultValuePipe(20), ParseIntPipe) pageSize: number
  ) {
    this.logger.log('Received request to get new products');
    return this.productsService.findNew();
  }

  @Get("/highlighted")
  async getHighlightedProducts() {
    this.logger.log('Received request to get highlighted products');
    return this.productsService.findHighlighted();
  }

  @Get("/discounted")
  async getDiscountedProducts() {
    this.logger.log('Received request to get discounted products');
    return this.productsService.findDiscounted();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Product | null> {
    this.logger.log(`Received request to find product with ID: ${id}`);
    const numericId = parseInt(id, 10);
    return this.productsService.findOne(numericId);
  }

  // @Get(':id/images')
  // getProductImages(@Param('id') id: string): Promise<ProductImage[]> {
  //   const numericId = parseInt(id, 10);
  //   return this.productsService.findImagesByProductId(numericId);
  // }

  @Get(":productId/images")
  async findImages(@Param("productId") productId: number, @Query("presentationId") presentationId?: number): Promise<ProductImage[]> {
    return this.productsService.findImages(productId, Number(presentationId));
  }

  @Get("/original-price/:id")
  getOriginaPrice(
    @Param("id") id: number,
    @Query("quantity") quantity: number,
    @Query("presentationId") presentationId?: number
  ): Promise<number | null> {
    return this.productsService.getOriginalPrice(id, quantity, presentationId);
  }

  @Get("/discount-price/:id")
  getDiscountPrice(
    @Param("id") id: number,
    @Query("quantity") quantity: number,
    @Query("presentationId") presentationId?: number
  ): Promise<number | null> {
    return this.productsService.getDiscountPrice(id, quantity, presentationId);
  }

  @Get("/price/:id")
  getPrice(@Param("id") id: number, @Query("quantity") quantity: number, @Query("presentationId") presentationId?: number): Promise<number | null> {
    return this.productsService.getPrice(id, quantity, presentationId);
  }

  @Post("/total")
  getTotalPrice(@Body() body: { cart: { productId: number; quantity: number }[] }): Promise<number | null> {
    return this.productsService.getTotalPrice(body.cart);
  }

  @Post("/finalTotal")
  getTotalFinalPrice(@Body() body: { cart: { productId: number; quantity: number }[] }): Promise<number | null> {
    return this.productsService.getTotalFinalPrice(body.cart);
  }

  @Put(":id")
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  update(@Param("id") id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product | null> {
    this.logger.log(`Received request to update product with ID: ${id}`);
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  remove(@Param("id") id: number): Promise<void> {
    this.logger.log(`Received request to delete product with ID: ${id}`);
    return this.productsService.delete(id);
  }
}
