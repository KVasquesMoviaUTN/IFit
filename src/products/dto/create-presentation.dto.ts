import { IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePresentationDto {
  @ApiProperty({ description: 'The name of the presentation', example: 'Chocolate 1kg' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The price of the presentation', example: 5000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'The flavour of the presentation', example: 'Chocolate' })
  @IsString()
  flavour: string;

  @ApiProperty({ description: 'Description of the presentation', example: '1kg bag of chocolate whey protein' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Stock quantity', example: 50 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiPropertyOptional({ description: 'Image identifier (Cloudinary public_id)', example: 'products/whey-choco-1kg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Nutritional information', example: 'Calories: 120...' })
  @IsOptional()
  @IsString()
  informacion_nutricional?: string;

  @ApiProperty({ description: 'Display presentation in catalog', example: true })
  @IsBoolean()
  display: boolean;
}
