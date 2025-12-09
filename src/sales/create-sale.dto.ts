import { IsString, IsNumber, IsOptional, IsDecimal, IsInt, IsArray, ValidateNested, IsObject, IsDateString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSaleDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleDetailDto)
  details: SaleDetailDto[];

  @IsOptional()
  @IsNumber()
  paymentMethodId?: number;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsObject()
  address?: object;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsBoolean()
  known_client?: boolean;
}

export class SaleDetailDto {
  @IsNumber()
  productId: number;

  @IsInt()
  quantity: number;

  @IsInt()
  @IsOptional()
  presentationId?: number;

  @IsNumber()
  @IsOptional()
  discount?: number;
}