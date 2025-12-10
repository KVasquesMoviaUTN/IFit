import { Controller, Get, Post, Body, Param, Put, Delete, Query, DefaultValuePipe, ParseIntPipe, UseGuards, Logger } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { Product } from "./entities/product.entity";
import { ProductImage } from "./entities/product-image.entity";
import { ProductPriceHistory } from "./entities/product-price-history.entity";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Products')
@Controller("products")
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.', type: Product })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log(`Received request to create product: ${createProductDto.name}`);
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  async getProducts(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("pageSize", new DefaultValuePipe(20), ParseIntPipe) pageSize: number
  ) {
    this.logger.log(`Received request to get products page ${page}`);
    return this.productsService.findAll(page, pageSize);
  }

  @Get("/new")
  @ApiOperation({ summary: 'Get new products' })
  @ApiResponse({ status: 200, description: 'Return new products.' })
  async getNewProducts(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("pageSize", new DefaultValuePipe(20), ParseIntPipe) pageSize: number
  ) {
    this.logger.log('Received request to get new products');
    return this.productsService.findNew();
  }

  @Get("/highlighted")
  @ApiOperation({ summary: 'Get highlighted products' })
  @ApiResponse({ status: 200, description: 'Return highlighted products.' })
  async getHighlightedProducts() {
    this.logger.log('Received request to get highlighted products');
    return this.productsService.findHighlighted();
  }

  @Get("/discounted")
  @ApiOperation({ summary: 'Get discounted products' })
  @ApiResponse({ status: 200, description: 'Return discounted products.' })
  async getDiscountedProducts() {
    this.logger.log('Received request to get discounted products');
    return this.productsService.findDiscounted();
  }

  @Get(":id")
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({ status: 200, description: 'Return the product.', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param("id") id: string): Promise<Product | null> {
    this.logger.log(`Received request to find product with ID: ${id}`);
    const numericId = parseInt(id, 10);
    return this.productsService.findOne(numericId);
  }

  @Get(":productId/images")
  @ApiOperation({ summary: 'Get product images' })
  @ApiResponse({ status: 200, description: 'Return product images.', type: [ProductImage] })
  async findImages(@Param("productId") productId: number, @Query("presentationId") presentationId?: number): Promise<ProductImage[]> {
    return this.productsService.findImages(productId, Number(presentationId));
  }

  @Get(":id/price-history")
  @ApiOperation({ summary: 'Get product price history' })
  @ApiResponse({ status: 200, description: 'Return product price history.', type: [ProductPriceHistory] })
  async getPriceHistory(@Param("id") id: number): Promise<ProductPriceHistory[]> {
    return this.productsService.getPriceHistory(id);
  }

  @Get("/original-price/:id")
  @ApiOperation({ summary: 'Get original price' })
  getOriginaPrice(
    @Param("id") id: number,
    @Query("quantity") quantity: number,
    @Query("presentationId") presentationId?: number
  ): Promise<number | null> {
    return this.productsService.getOriginalPrice(id, quantity, presentationId);
  }

  @Get("/discount-price/:id")
  @ApiOperation({ summary: 'Get discount price' })
  getDiscountPrice(
    @Param("id") id: number,
    @Query("quantity") quantity: number,
    @Query("presentationId") presentationId?: number
  ): Promise<number | null> {
    return this.productsService.getDiscountPrice(id, quantity, presentationId);
  }

  @Get("/price/:id")
  @ApiOperation({ summary: 'Get price' })
  getPrice(@Param("id") id: number, @Query("quantity") quantity: number, @Query("presentationId") presentationId?: number): Promise<number | null> {
    return this.productsService.getPrice(id, quantity, presentationId);
  }

  @Post("/total")
  @ApiOperation({ summary: 'Calculate total price' })
  getTotalPrice(@Body() body: { cart: { productId: number; quantity: number }[] }): Promise<number | null> {
    return this.productsService.getTotalPrice(body.cart);
  }

  @Post("/finalTotal")
  @ApiOperation({ summary: 'Calculate final total price' })
  getTotalFinalPrice(@Body() body: { cart: { productId: number; quantity: number }[] }): Promise<number | null> {
    return this.productsService.getTotalFinalPrice(body.cart);
  }

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.', type: Product })
  update(@Param("id") id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product | null> {
    this.logger.log(`Received request to update product with ID: ${id}`);
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  remove(@Param("id") id: number): Promise<void> {
    this.logger.log(`Received request to delete product with ID: ${id}`);
    return this.productsService.delete(id);
  }
}
