import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService;

  beforeEach(async () => {
    mockAuthService = {
      validateUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return error message if validation fails', async () => {
      mockAuthService.validateUser.mockResolvedValue(null);
      
      const body = { mail: 'test@test.com', password: 'wrong' };
      const result = await controller.login(body);
      
      expect(result).toEqual({ message: 'Credenciales incorrectas' });
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(body.mail, body.password);
    });

    it('should return success message and user if validation succeeds', async () => {
      const serviceResponse = {
        message: 'Inicio de sesión exitoso',
        user: { id: 1, name: 'Test' }
      };
      mockAuthService.validateUser.mockResolvedValue(serviceResponse);

      const body = { mail: 'test@test.com', password: 'correct' };
      const result = await controller.login(body);

      expect(result).toEqual({
        message: 'Inicio de sesión exitoso',
        user: serviceResponse,
      });
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(body.mail, body.password);
    });
  });
});
