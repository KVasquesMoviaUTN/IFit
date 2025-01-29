import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './create-sale.dto';
import { SaleDetail } from './entities/sale-detail.entity';
import { ProductsService } from 'src/products/products.service';
import { PaymentMethod } from './entities/payment-method.entity';
import { SaleStatus } from './entities/sale-status.entity';
import { Users } from 'src/users/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    @InjectRepository(SaleStatus)
    private saleStatusRepository: Repository<SaleStatus>,

    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,

    @InjectRepository(SaleDetail)
    private readonly saleDetailRepository: Repository<SaleDetail>,  

    private readonly productsService: ProductsService,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const { saleDetails, ...saleData } = createSaleDto;

    const total = await this.productsService.getTotalFinalPrice(saleDetails);

    const sale = this.saleRepository.create({
      user: { id: saleData.user },
      paymentMethod: { id: 2 },
      saleStatus: { id: 1 },
      total,
    });

    const savedSale = await this.saleRepository.save(sale);

    const saleDetailEntities = await Promise.all(saleDetails.map(async (detail) => {
      const subtotal = await this.productsService.getPrice(detail.productId, detail.quantity);
      
      return this.saleDetailRepository.create({
        product: { id: detail.productId } as Product,
        quantity: detail.quantity,
        subtotal,
        sale,
      });
    }));
  
    await this.saleDetailRepository.save(saleDetailEntities);

    return sale;
  }

  async findOne(id: number): Promise<Sale | null> {
    return this.saleRepository.findOne({ where: { id } });
  }

  async purchase(cart: { price: number, productId: number, quantity: number }[]): Promise<boolean> {
        
    return true;
  }
}
