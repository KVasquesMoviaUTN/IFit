import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  action: string;

  @IsObject()
  @IsOptional()
  metadata?: any;
}
