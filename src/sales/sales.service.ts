import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './create-sale.dto';
import { SaleDetail } from './entities/sale-detail.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    
    @InjectRepository(SaleDetail)
    private readonly saleDetailRepository: Repository<SaleDetail>,  
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const { saleDetails, ...saleData } = createSaleDto;

    const updatedSaleData = {
      ...saleData,
      paymentMethodId: 2,
      saleStatusId: 1,
    };

    const sale = this.saleRepository.create(updatedSaleData);
    const savedSale = await this.saleRepository.save(sale);
  
    const saleDetailEntities = saleDetails.map((detail) => {
      return this.saleDetailRepository.create({
        ...detail,
        sale: savedSale,
      });
    });

    await this.saleDetailRepository.save(saleDetailEntities);
  
    return savedSale;
  }

  async findOne(id: number): Promise<Sale | null> {
    return this.saleRepository.findOne({ where: { id } });
  }
}
