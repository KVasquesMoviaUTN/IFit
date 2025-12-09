import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './create-sale.dto';
import { SaleDetail } from './entities/sale-detail.entity';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';
import { MercadoPagoService } from 'src/payments/mercadopago.service';
import { isNumber } from 'class-validator';
import { PaymentMethodEnum } from './enums/payment-method.enum';
import { SaleStatus } from './enums/sale-status.enum';

@Injectable()
export class SalesService {
  private readonly logger = new Logger(SalesService.name);

  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,

    @InjectRepository(SaleDetail)
    private readonly saleDetailRepository: Repository<SaleDetail>,  

    private readonly productsService: ProductsService,

    private readonly paymentService: MercadoPagoService,
  ) {}

  async create(createSaleDto: CreateSaleDto)/* : Promise<Sale> */ {
    this.logger.log(`Creating sale for user: ${createSaleDto.userId}`);
    const { details, ...saleData } = createSaleDto;

    const totalPrice = await this.productsService.getTotalFinalPrice(details);

    const shipping = (totalPrice > 50000) ? 0 : await this.getShippingCost(saleData.address as { state: string });

    const total = totalPrice + shipping;

    const sale = this.saleRepository.create({
      user: saleData.userId ? { id: saleData.userId } : undefined,
      paymentMethod: PaymentMethodEnum.MERCADO_PAGO,
      saleStatus: SaleStatus.PENDING,
      total,
    });

    const savedSale = await this.saleRepository.save(sale);
    this.logger.log(`Sale created with ID: ${savedSale.id}`);
    
    const saleDetailEntities = await Promise.all(details.map(async (detail) => {
      const subtotal = await this.productsService.getPrice(detail.productId, detail.quantity);
      
      return this.saleDetailRepository.create({
        product: { id: detail.productId } as Product,
        quantity: detail.quantity,
        sale: savedSale,
        subtotal,
      });
    }));
    
    await this.saleDetailRepository.save(saleDetailEntities);

    const preferenceDTO = {
      id: "1",//TODO hacer dinamico
      price: total,
    };

    const preference = await this.paymentService.createPreference(preferenceDTO);
    
    // For automatic sales, we don't decrease stock immediately here, 
    // it should be done upon payment confirmation (webhook) or if the business logic dictates otherwise.
    // Assuming for now web sales stock deduction happens elsewhere or is pending implementation.

    return preference;
  }

  async createManual(createSaleDto: CreateSaleDto): Promise<Sale> {
    this.logger.log(`Creating manual sale for user: ${createSaleDto.userId}`);
    const { details, ...saleData } = createSaleDto;

    let totalPrice = 0;
    for (const detail of details) {
      const unitPrice = await this.productsService.getPrice(detail.productId, 1, detail.presentationId);
      const discount = detail.discount || 0;
      totalPrice += (unitPrice - discount) * detail.quantity;
    }
    
    // Manual sales typically don't have shipping cost or it's included/calculated differently.
    // Assuming 0 for manual sales unless specified.
    const shipping = 0; 

    const total = totalPrice + shipping;

    const sale = this.saleRepository.create({
      user: saleData.userId ? { id: saleData.userId } : undefined,
      paymentMethod: (saleData.paymentMethod || saleData.paymentMethodId || PaymentMethodEnum.EFECTIVO).toString(),
      saleStatus: SaleStatus.COMPLETED, // Default to Completed
      total,
      shipping,
      known_client: saleData.known_client || false,
      created_at: saleData.date ? new Date(saleData.date) : undefined
    });

    const savedSale = await this.saleRepository.save(sale);
    this.logger.log(`Manual sale created with ID: ${savedSale.id}`);
    
    const saleDetailEntities = await Promise.all(details.map(async (detail) => {
      const unit_price = await this.productsService.getPrice(detail.productId, 1, detail.presentationId);
      const discount = detail.discount || 0;
      const subtotal = (unit_price - discount) * detail.quantity;
      
      // Decrease stock for manual sales immediately
      await this.productsService.decreaseStock(detail.productId, detail.quantity, detail.presentationId);

      return this.saleDetailRepository.create({
        product: { id: detail.productId } as Product,
        presentation: detail.presentationId ? { id: detail.presentationId } : undefined,
        quantity: detail.quantity,
        sale: savedSale,
        unit_price,
        discount,
        subtotal,
      });
    }));
    
    await this.saleDetailRepository.save(saleDetailEntities);

    return savedSale;
  }

  async getShippingCost(address: { state: string }): Promise<number> {
    this.logger.log(`Calculating shipping cost for address: ${JSON.stringify(address)}`);
    
    const shippingRates: Record<string, number> = {
      'Autonomous City of Buenos Aires': 3000,
      'Buenos Aires': 5000,
    };

    return shippingRates[address.state] || 9999;
  }

  async findOne(id: number): Promise<Sale | null> {
    this.logger.log(`Fetching sale with ID: ${id}`);
    return this.saleRepository.findOne({ where: { id } });
  }

  async purchase(cart: { price: number, productId: number, quantity: number }[]): Promise<boolean> {
        
    return true;
  }
}
