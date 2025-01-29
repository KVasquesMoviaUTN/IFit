import { IsString, IsNumber, IsOptional, IsDecimal, IsInt } from 'class-validator';

export class CreateSaleDto {
  @IsInt()
  user: number;

  saleDetails: {
    productId: number;
    quantity: number;
  }[];
}