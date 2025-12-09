import { Test, TestingModule } from '@nestjs/testing';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './create-sale.dto';
import { Sale } from './entities/sale.entity';

describe('SalesController', () => {
  let controller: SalesController;
  let service: SalesService;

  const mockSalesService = {
    create: jest.fn(),
    createManual: jest.fn(),
    getShippingCost: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [
        {
          provide: SalesService,
          useValue: mockSalesService,
        },
      ],
    }).compile();

    controller = module.get<SalesController>(SalesController);
    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a sale', async () => {
      const dto: CreateSaleDto = { userId: 1, details: [], address: {}, paymentMethodId: 1 };
      const result = { id: 'pref_123', price: 100 };
      mockSalesService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(mockSalesService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('createManual', () => {
    it('should create a manual sale', async () => {
      const dto: CreateSaleDto = { userId: 1, details: [], address: {}, paymentMethodId: 1 };
      const result: Sale = { id: 1, total: 100, shipping: 0, created_at: new Date(), updated_at: new Date(), user: {} as any, paymentMethod: 'Efectivo', paymentChannel: 'Local', saleStatus: {} as any, saleDetail: [], known_client: false };
      mockSalesService.createManual.mockResolvedValue(result);

      expect(await controller.createManual(dto)).toBe(result);
      expect(mockSalesService.createManual).toHaveBeenCalledWith(dto);
    });
  });

  describe('shippingCost', () => {
    it('should return shipping cost', async () => {
      const address = { state: 'Buenos Aires' };
      const result = 5000;
      mockSalesService.getShippingCost.mockResolvedValue(result);

      expect(await controller.shippingCost(address)).toBe(result);
      expect(mockSalesService.getShippingCost).toHaveBeenCalledWith(address);
    });
  });
});
