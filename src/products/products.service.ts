import { Injectable } from "@nestjs/common";
import { Repository, MoreThan } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductImage } from "./entities/product-image.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(page: number, pageSize: number = 20): Promise<{ products: Product[]; totalPages: number; hasNextPage: boolean }> {
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
    return this.productsRepository.findOne({
      where: { id },
      relations: ["presentation"],
    });
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
    await this.productsRepository.update(id, updateProductDto);
    return this.productsRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.productsRepository.delete(id);
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

  async getTotalFinalPrice(cart: { productId: number; quantity: number }[]): Promise<number> {
    let totalPrice = 0;

    for (const product of cart) {
      const productSafe = await this.findOne(product.productId);

      if (!productSafe) throw new Error(`Producto con ID ${product.productId} no encontrado`);

      totalPrice += this.calculateDiscount(productSafe, productSafe.price, product.quantity);
    }

    return Math.round(totalPrice);
  }

  private calculateDiscount(product: Product, price: number, quantity: number): number {
    let discountPrice = Math.round(price * (1 - product.discount / 100));
    return Math.round(quantity > 4 ? discountPrice * quantity * (1 - parseFloat(process.env.DESCUENTO ?? "0")) : discountPrice * quantity);
  }
}
