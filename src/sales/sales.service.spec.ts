import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from './entities/sale-detail.entity';
import { ProductsService } from '../products/products.service';
import { MercadoPagoService } from '../payments/mercadopago.service';

describe('SalesService', () => {
  let service: SalesService;
  let mockSaleRepository;
  let mockSaleDetailRepository;
  let mockProductsService;
  let mockMercadoPagoService;

  beforeEach(async () => {
    mockSaleRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };
    mockSaleDetailRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };
    mockProductsService = {
      getTotalFinalPrice: jest.fn(),
      getPrice: jest.fn(),
    };
    mockMercadoPagoService = {
      createPreference: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,
        {
          provide: getRepositoryToken(Sale),
          useValue: mockSaleRepository,
        },
        {
          provide: getRepositoryToken(SaleDetail),
          useValue: mockSaleDetailRepository,
        },
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
        {
          provide: MercadoPagoService,
          useValue: mockMercadoPagoService,
        },
      ],
    }).compile();

    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a sale and return preference', async () => {
      const createSaleDto = {
        user: 1,
        address: { state: 'Buenos Aires' },
        saleDetails: [{ productId: 1, quantity: 1 }],
      };

      mockProductsService.getTotalFinalPrice.mockResolvedValue(10000);
      mockProductsService.getPrice.mockResolvedValue(10000);
      
      const savedSale = { id: 1, ...createSaleDto };
      mockSaleRepository.create.mockReturnValue(savedSale);
      mockSaleRepository.save.mockResolvedValue(savedSale);
      
      mockSaleDetailRepository.create.mockReturnValue({});
      mockSaleDetailRepository.save.mockResolvedValue([]);

      const preference = { id: 'pref_123' };
      mockMercadoPagoService.createPreference.mockResolvedValue(preference);

      const result = await service.create(createSaleDto as any);
      
      expect(result).toEqual(preference);
      expect(mockSaleRepository.save).toHaveBeenCalled();
      expect(mockSaleDetailRepository.save).toHaveBeenCalled();
      expect(mockMercadoPagoService.createPreference).toHaveBeenCalled();
    });
  });

  describe('getShippingCost', () => {
    it('should return 3000 for CABA', async () => {
      const cost = await service.getShippingCost({ state: 'Autonomous City of Buenos Aires' });
      expect(cost).toBe(3000);
    });

    it('should return 5000 for Buenos Aires', async () => {
      const cost = await service.getShippingCost({ state: 'Buenos Aires' });
      expect(cost).toBe(5000);
    });

    it('should return 9999 for other locations', async () => {
      const cost = await service.getShippingCost({ state: 'Cordoba' });
      expect(cost).toBe(9999);
    });
  });
});
