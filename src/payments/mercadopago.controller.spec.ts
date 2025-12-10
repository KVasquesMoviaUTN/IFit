import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoController } from './mercadopago.controller';
import { MercadoPagoService } from './mercadopago.service';
import { CreatePreferenceDto } from './create-preference.dto';

describe('MercadoPagoController', () => {
  let controller: MercadoPagoController;
  let service: MercadoPagoService;

  const mockMercadoPagoService = {
    createPreference: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MercadoPagoController],
      providers: [
        {
          provide: MercadoPagoService,
          useValue: mockMercadoPagoService,
        },
      ],
    }).compile();

    controller = module.get<MercadoPagoController>(MercadoPagoController);
    service = module.get<MercadoPagoService>(MercadoPagoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPreference', () => {
    it('should create a preference', async () => {
      const dto: CreatePreferenceDto = { 
        items: [
          { id: 1, quantity: 1 }
        ]
      };
      const result = { id: 'pref_123' };
      mockMercadoPagoService.createPreference.mockResolvedValue(result);

      expect(await controller.createPreference(dto)).toBe(result);
      expect(mockMercadoPagoService.createPreference).toHaveBeenCalledWith(dto);
    });
  });
});
