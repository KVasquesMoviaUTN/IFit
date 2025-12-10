import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from './entities/sale-detail.entity';
import { ProductsService } from '../products/products.service';
import { MercadoPagoService } from '../payments/mercadopago.service';
import { CreateSaleDto } from './create-sale.dto';
import { PaymentMethodEnum } from './enums/payment-method.enum';

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
    };
    mockSaleDetailRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };
    mockProductsService = {
      getPrice: jest.fn(),
      decreaseStock: jest.fn(),
      findOne: jest.fn(),
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

  describe('createManual', () => {
    it('should create a manual sale', async () => {
      const saleData: CreateSaleDto = {
        details: [
          { productId: 1, quantity: 2, presentationId: 1 },
        ],
        paymentMethod: PaymentMethodEnum.EFECTIVO,
        paymentChannel: 'Local',
        shipping: 0,
      };

      const mockProductPrice = 100;
      const mockPurchasePrice = 50;
      mockProductsService.getPrice.mockResolvedValue(mockProductPrice);
      mockProductsService.findOne.mockResolvedValue({ purchase_price: mockPurchasePrice });
      
      const expectedTotal = 100 * 2;

      const mockSale = { id: 'sale1', total: expectedTotal };
      mockSaleRepository.create.mockReturnValue(mockSale);
      mockSaleRepository.save.mockResolvedValue(mockSale);

      const result = await service.createManual(saleData);

      expect(result).toEqual(mockSale);
      expect(mockSaleRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        total: expectedTotal
      }));
      expect(mockProductsService.getPrice).toHaveBeenCalledWith(1, 1, 1);
      expect(mockProductsService.findOne).toHaveBeenCalledWith(1);
      expect(mockSaleDetailRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        purchase_price: mockPurchasePrice
      }));
      expect(mockSaleDetailRepository.save).toHaveBeenCalled();
    });
    it('should create a manual sale with custom price', async () => {
      const saleData: CreateSaleDto = {
        details: [
          { productId: 1, quantity: 2, presentationId: 1, price: 150 }, // Custom price
        ],
        paymentMethod: PaymentMethodEnum.EFECTIVO,
        paymentChannel: 'Local',
        shipping: 0,
      };

      const mockProductPrice = 100; // Default price
      const mockPurchasePrice = 50;
      mockProductsService.getPrice.mockResolvedValue(mockProductPrice);
      mockProductsService.findOne.mockResolvedValue({ purchase_price: mockPurchasePrice });
      
      const expectedTotal = 150 * 2; // Should use custom price (150) instead of default (100)

      const mockSale = { id: 'sale1', total: expectedTotal };
      mockSaleRepository.create.mockReturnValue(mockSale);
      mockSaleRepository.save.mockResolvedValue(mockSale);

      const result = await service.createManual(saleData);

      expect(result).toEqual(mockSale);
      expect(mockSaleRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        total: expectedTotal
      }));
      // Ensure getPrice is NOT called or ignored if called (logic check: price priority)
      // In our implementation, we check detail.price first, so getPrice might not be called if we short-circuit,
      // or it might be called if we don't. Let's check the logic in service.
      // The code is: const unitPrice = detail.price || await this.productsService.getPrice(...)
      // So getPrice should NOT be called if price is provided.
      expect(mockProductsService.getPrice).not.toHaveBeenCalled();
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
