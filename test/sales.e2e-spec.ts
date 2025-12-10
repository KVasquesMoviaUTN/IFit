import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../src/auth/roles.guard';
import { ProductsService } from '../src/products/products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sale } from '../src/sales/entities/sale.entity';
import { SaleDetail } from '../src/sales/entities/sale-detail.entity';
import { Product } from '../src/products/entities/product.entity';

describe('SalesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const mockProductsService = {
      getPrice: jest.fn().mockResolvedValue(100),
      decreaseStock: jest.fn().mockResolvedValue(undefined),
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Test Product', price: 100, discount: 0 }),
    };

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
      getRawOne: jest.fn().mockResolvedValue({ total: '10000', totalProfit: '2000', total_weight: '500' }),
      getCount: jest.fn().mockResolvedValue(10),
      getRawMany: jest.fn().mockResolvedValue([]),
      expressionMap: {
        joinAttributes: [],
      },
    };

    const mockSaleRepository = {
      create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
      save: jest.fn().mockImplementation((sale) => Promise.resolve({ id: 1, ...sale })),
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    const mockProductRepository = {
      createQueryBuilder: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ red: '1', yellow: '2', green: '3' }),
        getMany: jest.fn().mockResolvedValue([]),
      }),
    };

    const mockSaleDetailRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockResolvedValue([]),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .overrideProvider(getRepositoryToken(Sale))
      .useValue(mockSaleRepository)
      .overrideProvider(getRepositoryToken(SaleDetail))
      .useValue(mockSaleDetailRepository)
      .overrideProvider(getRepositoryToken(Product))
      .useValue(mockProductRepository)
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/sales/manual (POST)', () => {
    it('should create a manual sale with custom price and payment channel', () => {
      return request(app.getHttpServer())
        .post('/sales/manual')
        .send({
          details: [
            { productId: 1, quantity: 1, presentationId: 1, price: 500 }, // Custom price
          ],
          paymentMethod: 'Efectivo',
          paymentChannel: 'Redes',
          shipping: 200,
          date: new Date().toISOString(),
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.total).toBe(700); // 500 + 200
          expect(response.body.paymentChannel).toBe('Redes');
          expect(response.body.shipping).toBe(200);
        });
    });
  });

  describe('/sales/statistics (GET)', () => {
    it('should return statistics with net profit', () => {
      return request(app.getHttpServer())
        .get('/sales/statistics')
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('totalRevenue');
          expect(response.body).toHaveProperty('totalProfit');
          expect(response.body).toHaveProperty('netProfit');
          
          
          const totalRevenue = parseFloat(response.body.totalRevenue);
          const totalProfit = parseFloat(response.body.totalProfit);
          const netProfit = parseFloat(response.body.netProfit);
          
          // Verify formula: Net Profit = (Revenue * 0.9) - (Revenue - Gross Profit)
          const expectedNetProfit = (totalRevenue * 0.9) - (totalRevenue - totalProfit);
          
          // Use closeTo for floating point comparison
          expect(netProfit).toBeCloseTo(expectedNetProfit, 2);
        });
    });
  });
});
