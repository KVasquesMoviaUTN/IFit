import { IsString, IsNumber, IsOptional, IsPositive, Min, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Whey Protein' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The price of the product', example: 5000 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiPropertyOptional({ description: 'The purchase price of the product', example: 3000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  purchase_price?: number;

  @ApiPropertyOptional({ description: 'The image identifier (Cloudinary public_id)', example: 'products/whey-protein' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'The stock quantity', example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ description: 'The unit of measurement', example: 'kg' })
  @IsOptional()
  @IsString()
  unidad?: string;

  @ApiPropertyOptional({ description: 'Product description', example: 'High quality whey protein' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Sales unit', example: 1 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  unidad_venta?: number;

  @ApiPropertyOptional({ description: 'Order of display', example: 1 })
  @IsOptional()
  @IsNumber()
  display_order?: number;

  @ApiPropertyOptional({ description: 'Nutritional information', example: 'Calories: 120, Protein: 24g' })
  @IsOptional()
  @IsString()
  informacion_nutricional?: string;

  @ApiPropertyOptional({ description: 'Product category', example: 'Suplementos' })
  @IsOptional()
  @IsString()
  @IsString()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Product highlight', example: 'Nuevo' })
  @IsOptional()
  @IsString()
  highlight?: string;

  @ApiPropertyOptional({ description: 'Display product in catalog', example: true })
  @IsOptional()
  @IsBoolean()
  display?: boolean;
}