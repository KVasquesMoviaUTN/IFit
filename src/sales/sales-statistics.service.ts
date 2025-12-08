import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { Product } from '../products/entities/product.entity';
import { SaleStatus } from './enums/sale-status.enum';
import { SalesStatisticsFiltersDto } from './dto/sales-statistics-filters.dto';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class SalesStatisticsService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getStatistics(filters: SalesStatisticsFiltersDto) {
    const { startDate, endDate } = filters;
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date();
    
    // Ensure end date includes the whole day
    end.setHours(23, 59, 59, 999);

    const createBaseQuery = () => {
      const query = this.saleRepository.createQueryBuilder('sale');
      query
        .where('sale.created_at BETWEEN :start AND :end', { start, end })
        .andWhere('sale.saleStatus = :status', { status: SaleStatus.COMPLETED });
      
      this.applyFilters(query, filters);
      return query;
    };

    // Total Revenue
    const totalRevenueResult = await createBaseQuery()
      .select('SUM(sale.total)', 'total')
      .getRawOne();
    const totalRevenue = parseFloat(totalRevenueResult.total) || 0;

    // Total Sales Count
    const totalSalesCount = await createBaseQuery().getCount();

    // Sales by Payment Method
    const salesByPaymentMethod = await createBaseQuery()
      .select('sale.paymentMethod', 'method')
      .addSelect('COUNT(sale.id)', 'count')
      .addSelect('SUM(sale.total)', 'total')
      .groupBy('sale.paymentMethod')
      .getRawMany();

    // Sales by Date
    const salesByDate = await createBaseQuery()
      .select('DATE(sale.created_at)', 'date')
      .addSelect('SUM(sale.total)', 'total')
      .addSelect('COUNT(sale.id)', 'count')
      .groupBy('DATE(sale.created_at)')
      .orderBy('date', 'ASC')
      .getRawMany();

    // Top Selling Products
    const topSellingProductsQuery = createBaseQuery();
    if (!topSellingProductsQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'saleDetail')) {
        topSellingProductsQuery.leftJoin('sale.saleDetail', 'saleDetail');
    }
    if (!topSellingProductsQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'product')) {
        topSellingProductsQuery.leftJoin('saleDetail.product', 'product');
    }

    const topSellingProducts = await topSellingProductsQuery
      .select('product.name', 'name')
      .addSelect('SUM(saleDetail.quantity)', 'quantity')
      .groupBy('product.name')
      .orderBy('quantity', 'DESC')
      .limit(5)
      .getRawMany();

    // Sales by Category
    const salesByCategoryQuery = createBaseQuery();
    if (!salesByCategoryQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'saleDetail')) {
        salesByCategoryQuery.leftJoin('sale.saleDetail', 'saleDetail');
    }
    if (!salesByCategoryQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'product')) {
        salesByCategoryQuery.leftJoin('saleDetail.product', 'product');
    }

    const salesByCategory = await salesByCategoryQuery
      .select('product.category', 'category')
      .addSelect('SUM(saleDetail.subtotal)', 'total')
      .groupBy('product.category')
      .getRawMany();

    // Sales by User
    const salesByUserQuery = createBaseQuery();
    salesByUserQuery.leftJoin('sale.user', 'user');
    
    const salesByUser = await salesByUserQuery
      .select("CONCAT(user.name, ' ', user.surname)", 'userName')
      .addSelect('COUNT(sale.id)', 'count')
      .addSelect('SUM(sale.total)', 'total')
      .groupBy('user.id')
      .addGroupBy('user.name')
      .addGroupBy('user.surname')
      .orderBy('total', 'DESC')
      .limit(5)
      .getRawMany();

    // Total Weight (in grams)
    const totalWeightQuery = createBaseQuery();
    if (!totalWeightQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'saleDetail')) {
        totalWeightQuery.leftJoin('sale.saleDetail', 'saleDetail');
    }
    if (!totalWeightQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'product')) {
        totalWeightQuery.leftJoin('saleDetail.product', 'product');
    }

    const totalWeightResult = await totalWeightQuery
      .select('SUM(CASE WHEN product.unidad = \'kg\' THEN saleDetail.quantity * product.unidad_venta * 1000 WHEN product.unidad = \'g\' THEN saleDetail.quantity * product.unidad_venta ELSE 0 END)', 'total_weight')
      .getRawOne();
    
    const totalWeight = parseFloat(totalWeightResult.total_weight) || 0;

    // Historic Sales by Category
    const historicCategorySalesQuery = createBaseQuery();
    if (!historicCategorySalesQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'saleDetail')) {
        historicCategorySalesQuery.leftJoin('sale.saleDetail', 'saleDetail');
    }
    if (!historicCategorySalesQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'product')) {
        historicCategorySalesQuery.leftJoin('saleDetail.product', 'product');
    }

    const historicCategorySales = await historicCategorySalesQuery
      .select('DATE(sale.created_at)', 'date')
      .addSelect('product.category', 'category')
      .addSelect('SUM(saleDetail.subtotal)', 'total')
      .groupBy('DATE(sale.created_at)')
      .addGroupBy('product.category')
      .orderBy('date', 'ASC')
      .getRawMany();

    // Top Products by Weight
    const topProductsByWeightQuery = createBaseQuery();
    if (!topProductsByWeightQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'saleDetail')) {
        topProductsByWeightQuery.leftJoin('sale.saleDetail', 'saleDetail');
    }
    if (!topProductsByWeightQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'product')) {
        topProductsByWeightQuery.leftJoin('saleDetail.product', 'product');
    }

    const topProductsByWeight = await topProductsByWeightQuery
      .select('product.name', 'name')
      .addSelect('SUM(CASE WHEN product.unidad = \'kg\' THEN saleDetail.quantity * product.unidad_venta * 1000 WHEN product.unidad = \'g\' THEN saleDetail.quantity * product.unidad_venta ELSE 0 END)', 'total_weight')
      .groupBy('product.name')
      .orderBy('total_weight', 'DESC')
      .limit(5)
      .getRawMany();

    // Sales by Location (State)
    const salesByLocationQuery = createBaseQuery();
    salesByLocationQuery.leftJoin('sale.user', 'user');

    const salesByLocation = await salesByLocationQuery
      .select("user.address ->> 'state'", 'location')
      .addSelect('SUM(sale.total)', 'total')
      .groupBy("user.address ->> 'state'")
      .orderBy('total', 'DESC')
      .getRawMany();

    // Sales by Neighborhood (Suburb)
    const salesByNeighborhoodQuery = createBaseQuery();
    salesByNeighborhoodQuery.leftJoin('sale.user', 'user');

    const salesByNeighborhood = await salesByNeighborhoodQuery
      .select("user.address ->> 'suburb'", 'neighborhood')
      .addSelect('COUNT(sale.id)', 'count')
      .addSelect('SUM(sale.total)', 'total')
      .groupBy("user.address ->> 'suburb'")
      .orderBy('total', 'DESC')
      .getRawMany();

    // Stock Semaphore
    const stockCounts = await this.productRepository
      .createQueryBuilder('product')
      .select('SUM(CASE WHEN product.stock <= 5 THEN 1 ELSE 0 END)', 'red')
      .addSelect('SUM(CASE WHEN product.stock > 5 AND product.stock <= 20 THEN 1 ELSE 0 END)', 'yellow')
      .addSelect('SUM(CASE WHEN product.stock > 20 THEN 1 ELSE 0 END)', 'green')
      .getRawOne();

    const criticalProducts = await this.productRepository
      .createQueryBuilder('product')
      .select(['product.name', 'product.stock'])
      .where('product.stock <= 5')
      .orderBy('product.stock', 'ASC')
      .getMany();

    // Total Profit
    const totalProfitQuery = createBaseQuery();
    if (!totalProfitQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'saleDetail')) {
        totalProfitQuery.leftJoin('sale.saleDetail', 'saleDetail');
    }
    if (!totalProfitQuery.expressionMap.joinAttributes.some(j => j.alias.name === 'product')) {
        totalProfitQuery.leftJoin('saleDetail.product', 'product');
    }

    const totalProfitResult = await totalProfitQuery
      .select('SUM(saleDetail.subtotal - (saleDetail.quantity * product.purchase_price))', 'totalProfit')
      .getRawOne();
    
    const totalProfit = parseFloat(totalProfitResult.totalProfit) || 0;

    // Inactive Customers (Last purchase > 60 days ago)
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const inactiveCustomers = await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoin('sale.user', 'user')
      .select(['user.name', 'user.mail', 'user.phone', 'MAX(sale.created_at) as lastPurchaseDate'])
      .groupBy('user.id')
      .having('MAX(sale.created_at) < :date', { date: sixtyDaysAgo })
      .getRawMany();

    // Forecast Logic
    const forecast = await this.getSalesForecast(createBaseQuery);

    return {
      totalRevenue,
      totalProfit,
      totalSalesCount,
      totalWeight,
      salesByPaymentMethod: salesByPaymentMethod.map(item => ({
        method: item.method,
        count: parseInt(item.count, 10),
        total: parseFloat(item.total)
      })),
      salesByDate: salesByDate.map(item => ({
        date: item.date,
        total: parseFloat(item.total),
        count: parseInt(item.count, 10)
      })),
      topSellingProducts: topSellingProducts.map(item => ({
        name: item.name,
        quantity: parseInt(item.quantity, 10)
      })),
      topProductsByWeight: topProductsByWeight.map(item => ({
        name: item.name,
        weight: parseFloat(item.total_weight)
      })),
      salesByCategory: salesByCategory.map(item => ({
        category: item.category || 'Sin Categoría',
        total: parseFloat(item.total)
      })),
      salesByUser: salesByUser.map(item => ({
        userName: item.userName || 'Usuario Desconocido',
        count: parseInt(item.count, 10),
        total: parseFloat(item.total)
      })),
      historicCategorySales: historicCategorySales.map(item => ({
        date: item.date,
        category: item.category || 'Sin Categoría',
        total: parseFloat(item.total)
      })),
      salesByLocation: salesByLocation.map(item => ({
        location: item.location || 'Desconocido',
        total: parseFloat(item.total)
      })),
      salesByNeighborhood: salesByNeighborhood.map(item => ({
        neighborhood: item.neighborhood || 'Desconocido',
        count: parseInt(item.count, 10),
        total: parseFloat(item.total)
      })),
      stockSemaphore: {
        red: parseInt(stockCounts.red, 10) || 0,
        yellow: parseInt(stockCounts.yellow, 10) || 0,
        green: parseInt(stockCounts.green, 10) || 0,
        criticalProducts: criticalProducts.map(p => ({
          name: p.name,
          stock: parseFloat(p.stock as any)
        }))
      },
      inactiveCustomers: inactiveCustomers.map(c => ({
        name: c.user_name,
        mail: c.user_mail,
        phone: c.user_phone,
        lastPurchaseDate: c.lastPurchaseDate
      })),
      forecast
    };
  }

  private async getSalesForecast(createBaseQuery: () => SelectQueryBuilder<Sale>) {
    // 1. Get monthly sales for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1); // Start of the month

    const monthlySales = await createBaseQuery()
      .select("TO_CHAR(sale.created_at, 'YYYY-MM')", 'month')
      .addSelect('SUM(sale.total)', 'total')
      .where('sale.created_at >= :sixMonthsAgo', { sixMonthsAgo })
      .groupBy("TO_CHAR(sale.created_at, 'YYYY-MM')")
      .orderBy('month', 'ASC')
      .getRawMany();

    // Prepare data for regression (x = month index, y = total)
    const regressionData = monthlySales.map((item, index) => ({
      x: index + 1,
      y: parseFloat(item.total)
    }));

    // Calculate next month's index
    const nextMonthIndex = regressionData.length + 1;

    // Forecast Total Revenue
    const { slope, intercept } = this.calculateLinearRegression(regressionData);
    const forecastTotalRevenue = (slope * nextMonthIndex) + intercept;

    // 2. Forecast by Category
    const categorySales = await createBaseQuery()
      .leftJoin('sale.saleDetail', 'saleDetail')
      .leftJoin('saleDetail.product', 'product')
      .select("TO_CHAR(sale.created_at, 'YYYY-MM')", 'month')
      .addSelect('product.category', 'category')
      .addSelect('SUM(saleDetail.subtotal)', 'total')
      .where('sale.created_at >= :sixMonthsAgo', { sixMonthsAgo })
      .groupBy("TO_CHAR(sale.created_at, 'YYYY-MM')")
      .addGroupBy('product.category')
      .orderBy('month', 'ASC')
      .getRawMany();

    const categories = [...new Set(categorySales.map(item => item.category))];
    const forecastByCategory = categories.map(category => {
      const categoryData = categorySales
        .filter(item => item.category === category)
        .map((item, index) => ({ x: index + 1, y: parseFloat(item.total) }));
      
      // Fill missing months with 0 if needed, but for simplicity we use available points
      // A better approach would be to align all months, but this is a basic forecast
      
      if (categoryData.length < 2) return { category, forecast: 0, growth: 0 };

      const { slope, intercept } = this.calculateLinearRegression(categoryData);
      const forecast = (slope * (categoryData.length + 1)) + intercept;
      const lastValue = categoryData[categoryData.length - 1].y;
      const growth = lastValue > 0 ? ((forecast - lastValue) / lastValue) * 100 : 0;

      return {
        category: category || 'Sin Categoría',
        forecast: Math.max(0, forecast), // No negative sales
        growth
      };
    }).sort((a, b) => b.forecast - a.forecast);

    const nextMonthName = new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString('es-AR', { month: 'long', year: 'numeric' });

    // Prepare Graph Data
    const labels = monthlySales.map(item => item.month);
    labels.push(nextMonthName); // Add next month label

    const historicalData = monthlySales.map(item => parseFloat(item.total));
    
    // Forecast Data: Pad with nulls for historical months, then add last historical value (to connect line), then forecast
    const forecastData = new Array(historicalData.length - 1).fill(null);
    if (historicalData.length > 0) {
        forecastData.push(historicalData[historicalData.length - 1]); // Connect lines
    }
    forecastData.push(Math.max(0, forecastTotalRevenue));

    return {
      nextMonth: nextMonthName,
      forecastTotalRevenue: Math.max(0, forecastTotalRevenue),
      forecastByCategory,
      graphData: {
        labels,
        historical: historicalData,
        forecast: forecastData
      }
    };
  }

  private calculateLinearRegression(data: { x: number, y: number }[]) {
    const n = data.length;
    if (n === 0) return { slope: 0, intercept: 0 };

    const sumX = data.reduce((acc, val) => acc + val.x, 0);
    const sumY = data.reduce((acc, val) => acc + val.y, 0);
    const sumXY = data.reduce((acc, val) => acc + (val.x * val.y), 0);
    const sumXX = data.reduce((acc, val) => acc + (val.x * val.x), 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  }

  private applyFilters(query: SelectQueryBuilder<Sale>, filters: SalesStatisticsFiltersDto) {
    if (filters.paymentMethod) {
      query.andWhere('sale.paymentMethod = :paymentMethod', { paymentMethod: filters.paymentMethod });
    }

    if (filters.category || filters.productName) {
      // Ensure joins exist
      if (!query.expressionMap.joinAttributes.some(j => j.alias.name === 'saleDetail')) {
        query.leftJoin('sale.saleDetail', 'saleDetail');
      }
      if (!query.expressionMap.joinAttributes.some(j => j.alias.name === 'product')) {
        query.leftJoin('saleDetail.product', 'product');
      }

      if (filters.category) {
        query.andWhere('product.category ILIKE :category', { category: `%${filters.category}%` });
      }

      if (filters.productName) {
        query.andWhere('product.name ILIKE :productName', { productName: `%${filters.productName}%` });
      }
    }
  }
}
