import { IsString, IsNumber, IsOptional, IsDecimal, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSaleDto {
  @IsInt()
  @IsOptional()
  user?: number;

  @IsString()
  @IsOptional()
  paymentMethodId?: string;

  @IsOptional()
  address: any;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleDetailDto)
  saleDetails: SaleDetailDto[];
  
  @IsString()
  @IsOptional()
  date?: string;
}

export class SaleDetailDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsInt()
  @IsOptional()
  presentationId?: number;
}