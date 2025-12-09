import { Injectable, Logger } from "@nestjs/common";
import { Repository, MoreThan } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductImage } from "./entities/product-image.entity";
import { Presentation } from "./entities/presentation.entity";
import { ProductPriceHistory } from "./entities/product-price-history.entity";

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,

    @InjectRepository(ProductPriceHistory)
    private productPriceHistoryRepository: Repository<ProductPriceHistory>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log(`Creating product: ${createProductDto.name}`);
    const product = this.productsRepository.create(createProductDto);
    const savedProduct = await this.productsRepository.save(product);
    
    // Save initial price history
    await this.productPriceHistoryRepository.save({
      product: savedProduct,
      price: savedProduct.price,
      purchase_price: savedProduct.purchase_price
    });

    this.logger.log(`Product created with ID: ${savedProduct.id}`);
    return savedProduct;
  }

  async findAll(page: number, pageSize: number = 20): Promise<{ products: Product[]; totalPages: number; hasNextPage: boolean }> {
    this.logger.log(`Fetching products page ${page} with size ${pageSize}`);
    const [products, total] = await this.productsRepository.findAndCount({
      relations: ["presentation"],
      order: { display_order: "DESC" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalPages = Math.ceil(total / pageSize);
    const hasNextPage = page < totalPages;

    return {
      products,
      totalPages,
      hasNextPage,
    };
  }

  async findNew(): Promise<{ products: Product[] }> {
    this.logger.log('Fetching new products');
    const [products] = await this.productsRepository.findAndCount({
      where: {
        highlight: "Nuevo",
      },
      relations: ["presentation"],
      order: { display_order: "DESC" },
    });

    return {
      products,
    };
  }

  async findHighlighted(): Promise<{ products: Product[] }> {
    this.logger.log('Fetching highlighted products');
    const [products] = await this.productsRepository.findAndCount({
      where: {
        highlight: "Destacado",
      },
      relations: ["presentation"],
      order: { display_order: "DESC" },
    });

    return {
      products,
    };
  }

  async findDiscounted(): Promise<{ products: Product[] }> {
    this.logger.log('Fetching discounted products');
    const [products] = await this.productsRepository.findAndCount({
      where: {
        discount: MoreThan(0),
      },
      relations: ["presentation"],
      order: { display_order: "DESC" },
    });

    return {
      products,
    };
  }

  async findOne(id: number): Promise<Product | null> {
    this.logger.log(`Fetching product with ID: ${id}`);
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ["presentation"],
    });
    if (!product) {
        this.logger.warn(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findImagesByProductId(productId: number): Promise<ProductImage[]> {
    return this.productImageRepository.find({
      where: { product: { id: productId } },
    });
  }

  async findImages(productId: number, presentationId?: number): Promise<ProductImage[]> {
    if (presentationId) {
      return this.productImageRepository.find({
        where: { presentation: { id: presentationId } },
      });
    } else {
      return this.productImageRepository.find({
        where: { product: { id: productId } },
      });
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | null> {
    this.logger.log(`Updating product with ID: ${id}`);
    
    const currentProduct = await this.productsRepository.findOne({ where: { id } });
    if (!currentProduct) return null;

    await this.productsRepository.update(id, updateProductDto);
    
    // Check if price or purchase_price changed
    if (
      (updateProductDto.price !== undefined && updateProductDto.price !== currentProduct.price) ||
      (updateProductDto.purchase_price !== undefined && updateProductDto.purchase_price !== currentProduct.purchase_price)
    ) {
      await this.productPriceHistoryRepository.save({
        product: { id } as Product,
        price: updateProductDto.price !== undefined ? updateProductDto.price : currentProduct.price,
        purchase_price: updateProductDto.purchase_price !== undefined ? updateProductDto.purchase_price : currentProduct.purchase_price
      });
    }

    return this.productsRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`Deleting product with ID: ${id}`);
    await this.productsRepository.delete(id);
  }

  async decreaseStock(id: number, amount: number, presentationId?: number): Promise<void> {
    const NEGATIVE_LIMIT = -50;
    this.logger.log(`Decreasing stock for product ${id} (presentation: ${presentationId}) by ${amount}`);

    if (presentationId) {
      const result = await this.productsRepository.manager
        .createQueryBuilder()
        .update(Presentation)
        .set({ stock: () => `stock - ${amount}` })
        .where("id = :id", { id: presentationId })
        .andWhere("stock - :amount >= :limit", { amount, limit: NEGATIVE_LIMIT })
        .execute();

      if (result.affected === 0) {
        this.logger.warn(`Insufficient stock for presentation ${presentationId}. Limit is ${NEGATIVE_LIMIT}`);
        throw new Error(`Insufficient stock for presentation ${presentationId}. Limit is ${NEGATIVE_LIMIT}`);
      }
    } else {
      const result = await this.productsRepository
        .createQueryBuilder()
        .update(Product)
        .set({ stock: () => `stock - ${amount}` })
        .where("id = :id", { id })
        .andWhere("stock - :amount >= :limit", { amount, limit: NEGATIVE_LIMIT })
        .execute();

      if (result.affected === 0) {
        // Check if product exists to give better error message
        const productExists = await this.productsRepository.findOne({ where: { id } });
        if (!productExists) {
             this.logger.error(`Product with id ${id} not found`);
             throw new Error(`Product with id ${id} not found`);
        }

        this.logger.warn(`Insufficient stock for product ${id}. Limit is ${NEGATIVE_LIMIT}`);
        throw new Error(`Insufficient stock for product ${id}. Limit is ${NEGATIVE_LIMIT}`);
      }
    }
  }

  async getOriginalPrice(id: number, quantity: number, presentationId?: number): Promise<number> {
    let price: number;

    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ["presentation"],
    });

    if (!product) throw new Error(`Product with id ${id} not found`);

    if (presentationId) {
      const presentation = product.presentation.find((p) => p.id === presentationId);

      if (!presentation) throw new Error(`Presentation with id ${presentationId} not found for product ${id}`);

      price = presentation.price;
    } else {
      price = product.price;
    }

    return price;
  }

  async getDiscountPrice(id: number, quantity: number, presentationId?: number): Promise<number> {
    let price: number;

    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ["presentation"],
    });

    if (!product) throw new Error(`Product with id ${id} not found`);

    if (presentationId) {
      const presentation = product.presentation.find((p) => p.id === presentationId);

      if (!presentation) throw new Error(`Presentation with id ${presentationId} not found for product ${id}`);

      price = presentation.price;
    } else {
      price = product.price;
    }

    return Math.round(price * (1 - product.discount / 100));
  }

  async getPrice(id: number, quantity: number, presentationId?: number): Promise<number> {
    let price: number;

    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ["presentation"],
    });

    if (!product) throw new Error(`Product with id ${id} not found`);

    if (presentationId) {
      const presentation = product.presentation.find((p) => p.id === presentationId);

      if (!presentation) throw new Error(`Presentation with id ${presentationId} not found for product ${id}`);

      price = presentation.price;
    } else {
      price = product.price;
    }

    return Math.round(this.calculateDiscount(product, price, quantity));
  }

  async getTotalPrice(cart: { productId: number; quantity: number }[]): Promise<number | null> {
    let totalPrice = 0;

    for (const product of cart) {
      const productSafe = await this.findOne(product.productId);

      if (!productSafe) throw new Error(`Producto con ID ${product.productId} no encontrado`);

      totalPrice += Math.round(productSafe.price * product.quantity);
    }

    return Math.round(totalPrice);
  }



  async getTotalFinalPrice(cart: { productId: number; quantity: number; presentationId?: number }[]): Promise<number> {
    let totalPrice = 0;

    for (const product of cart) {
      const productSafe = await this.findOne(product.productId);

      if (!productSafe) throw new Error(`Producto con ID ${product.productId} no encontrado`);

      let price = productSafe.price;
      if (product.presentationId) {
        const presentation = productSafe.presentation.find(p => p.id === product.presentationId);
        if (presentation) {
          price = presentation.price;
        }
      }

      totalPrice += this.calculateDiscount(productSafe, price, product.quantity);
    }

    return Math.round(totalPrice);
  }

  private calculateDiscount(product: Product, price: number, quantity: number): number {
    let discountPrice = Math.round(price * (1 - product.discount / 100));
    return Math.round(quantity > 4 ? discountPrice * quantity * (1 - parseFloat(process.env.DESCUENTO ?? "0")) : discountPrice * quantity);
  }
}
