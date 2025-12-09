import { IsDateString, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShiftDto {
  @ApiProperty({ description: 'ID of the employee (User)', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'Start time of the shift', example: '2023-10-27T09:00:00Z' })
  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @ApiProperty({ description: 'End time of the shift', example: '2023-10-27T17:00:00Z' })
  @IsNotEmpty()
  @IsDateString()
  endTime: string;

  @ApiPropertyOptional({ description: 'Optional notes for the shift', example: 'Morning shift' })
  @IsOptional()
  @IsString()
  notes?: string;
}
