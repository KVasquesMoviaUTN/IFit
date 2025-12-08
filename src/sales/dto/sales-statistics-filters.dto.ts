import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { PaymentMethodEnum } from '../enums/payment-method.enum';

export class SalesStatisticsFiltersDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsEnum(PaymentMethodEnum)
  paymentMethod?: PaymentMethodEnum;
}
