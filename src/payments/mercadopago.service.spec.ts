import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoService } from './mercadopago.service';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { ProductsService } from '../products/products.service';

// Mock mercadopago
jest.mock('mercadopago', () => {
  return {
    MercadoPagoConfig: jest.fn(),
    Preference: jest.fn().mockImplementation(() => ({
      create: jest.fn(),
    })),
  };
});

describe('MercadoPagoService', () => {
  let service: MercadoPagoService;
  let mockPreferenceCreate: jest.Mock;
  let mockProductsService: any;

  beforeEach(async () => {
    mockPreferenceCreate = jest.fn();
    (Preference as unknown as jest.Mock).mockImplementation(() => ({
      create: mockPreferenceCreate,
    }));

    mockProductsService = {
      getTotalFinalPrice: jest.fn().mockResolvedValue(100),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MercadoPagoService,
        { provide: ProductsService, useValue: mockProductsService },
      ],
    }).compile();

    service = module.get<MercadoPagoService>(MercadoPagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPreference', () => {
    it('should create a preference successfully', async () => {
      const mockResponse = { id: '123', init_point: 'http://test.com' };
      mockPreferenceCreate.mockResolvedValue(mockResponse);

      const dto = { 
        items: [
          { id: 1, quantity: 1 }
        ]
      };
      const result = await service.createPreference(dto);

      expect(result).toEqual(mockResponse);
      expect(MercadoPagoConfig).toHaveBeenCalled();
      expect(Preference).toHaveBeenCalled();
      expect(mockProductsService.getTotalFinalPrice).toHaveBeenCalled();
      expect(mockPreferenceCreate).toHaveBeenCalledWith(expect.objectContaining({
        body: expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({
              unit_price: 100,
            }),
          ]),
        }),
      }));
    });

    it('should return null on error', async () => {
      mockPreferenceCreate.mockRejectedValue(new Error('API Error'));

      const dto = { 
        items: [
          { id: 1, quantity: 1 }
        ]
      };
      const result = await service.createPreference(dto);

      expect(result).toBeNull();
    });
  });
});
