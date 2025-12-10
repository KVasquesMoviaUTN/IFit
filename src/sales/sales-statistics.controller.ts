import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SalesStatisticsService } from './sales-statistics.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { SalesStatisticsFiltersDto } from './dto/sales-statistics-filters.dto';

@Controller('sales/statistics')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SalesStatisticsController {
  constructor(private readonly salesStatisticsService: SalesStatisticsService) {} // Changed service property name

  @Get()
  @Roles(Role.ADMIN)
  async getStatistics(@Query() filters: SalesStatisticsFiltersDto) {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const startDate = filters.startDate || firstDay.toISOString().split('T')[0];
    const endDate = filters.endDate || lastDay.toISOString().split('T')[0];

    return this.salesStatisticsService.getStatistics({ ...filters, startDate, endDate }); // Changed service call and service property name
  }
}
