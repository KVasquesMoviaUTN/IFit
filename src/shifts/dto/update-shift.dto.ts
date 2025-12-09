import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateShiftDto {
  @ApiPropertyOptional({ description: 'Start time of the shift' })
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @ApiPropertyOptional({ description: 'End time of the shift' })
  @IsOptional()
  @IsDateString()
  endTime?: string;

  @ApiPropertyOptional({ description: 'Optional notes for the shift' })
  @IsOptional()
  @IsString()
  notes?: string;
}
