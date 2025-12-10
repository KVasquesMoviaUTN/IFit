import { Test, TestingModule } from '@nestjs/testing';
import { SalesStatisticsService } from './sales-statistics.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Product } from '../products/entities/product.entity';

describe('SalesStatisticsService', () => {
  let service: SalesStatisticsService;
  let mockSaleRepository;
  let mockProductRepository;

  beforeEach(async () => {
    const mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      addGroupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      having: jest.fn().mockReturnThis(),
      getRawOne: jest.fn(),
      getRawMany: jest.fn(),
      getCount: jest.fn(),
      getMany: jest.fn(),
      expressionMap: {
        joinAttributes: [],
      },
    };

    mockSaleRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    mockProductRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesStatisticsService,
        {
          provide: getRepositoryToken(Sale),
          useValue: mockSaleRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<SalesStatisticsService>(SalesStatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStatistics', () => {
    it('should calculate netProfit as (Revenue * 0.9) - Cost', async () => {
      const mockTotalRevenue = 10000;
      const mockTotalProfit = 2000; // Gross Profit
      // Cost = 10000 - 2000 = 8000
      // Net Profit = (10000 * 0.9) - 8000 = 9000 - 8000 = 1000
      const mockNetProfit = 1000;

      const mockQueryBuilder = mockSaleRepository.createQueryBuilder();
      
      // Mocking specific calls based on the order they appear in the service
      
      // Total Revenue
      mockQueryBuilder.getRawOne.mockResolvedValueOnce({ total: mockTotalRevenue.toString() });
      // Total Sales Count
      mockQueryBuilder.getCount.mockResolvedValueOnce(10);
      // Sales by Payment Method
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);
      // Sales by Date
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);
      // Top Selling Products
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);
      // Sales by Category
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);
      // Sales by User
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);
      // Total Weight
      mockQueryBuilder.getRawOne.mockResolvedValueOnce({ total_weight: '500' });
      // Historic Category Sales
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);
      // Top Products by Weight
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);
      // Sales by Location
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);
      // Sales by Neighborhood
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);
      
      // Stock Semaphore (Product Repo)
      mockProductRepository.createQueryBuilder().getRawOne.mockResolvedValueOnce({ red: '1', yellow: '2', green: '3' });
      mockProductRepository.createQueryBuilder().getMany.mockResolvedValueOnce([]);

      // Total Profit (The one we care about)
      mockQueryBuilder.getRawOne.mockResolvedValueOnce({ totalProfit: mockTotalProfit.toString() });

      // Inactive Customers
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);
      
      // Forecast (Monthly Sales)
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);
      // Forecast (Category Sales)
      mockQueryBuilder.getRawMany.mockResolvedValueOnce([]);

      const result = await service.getStatistics({});

      expect(result.totalRevenue).toBe(mockTotalRevenue);
      expect(result.totalProfit).toBe(mockTotalProfit);
      expect(result.netProfit).toBe(mockNetProfit);
    });
  });
});
