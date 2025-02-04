import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './create-sale.dto';
import { SaleDetail } from './entities/sale-detail.entity';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';
import { MercadoPagoService } from 'src/payments/mercadopago.service';
import { isNumber } from 'class-validator';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,

    @InjectRepository(SaleDetail)
    private readonly saleDetailRepository: Repository<SaleDetail>,  

    private readonly productsService: ProductsService,

    private readonly paymentService: MercadoPagoService,
  ) {}

  async create(createSaleDto: CreateSaleDto)/* : Promise<Sale> */ {
    const { saleDetails, ...saleData } = createSaleDto;

    const totalPrice = await this.productsService.getTotalFinalPrice(saleDetails);

    const shipping = (totalPrice > 50000) ? 0 : await this.getShippingCost(saleData.address);

    const total = totalPrice + shipping;

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

    return preference;
  }

  async getShippingCost(address): Promise<number> {
      if (address.state == "Autonomous City of Buenos Aires")
        return 4000;

      return 7000;

      // if (address.state != "Buenos Aires")
      //   return 7000;

      // if (address.state == "Buenos Aires")
      //   return 5000;

      //   if (address.state_district == "Buenos Aires")
      //   return 5000
  }

  async findOne(id: number): Promise<Sale | null> {
    return this.saleRepository.findOne({ where: { id } });
  }

  async purchase(cart: { price: number, productId: number, quantity: number }[]): Promise<boolean> {
        
    return true;
  }
}
