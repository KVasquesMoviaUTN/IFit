import { IsString, IsNumber, IsOptional, IsDecimal, IsInt } from 'class-validator';
import { Users } from 'src/users/user.entity';
import { SaleStatus } from './entities/sale-status.entity';
import { PaymentMethod } from './entities/payment-method.entity';

export class CreateSaleDto {
  @IsString()
  name: string;

  @IsDecimal()
  total: number;

  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  paymentMethodId?: number;

  @IsOptional()
  @IsInt()
  saleStatusId?: number;

  saleDetails: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}