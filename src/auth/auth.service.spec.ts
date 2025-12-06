import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';

// Mock bcryptjs
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let mockUserRepository;

  beforeEach(async () => {
    mockUserRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return null if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      const result = await service.validateUser('test@test.com', 'password');
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      const user = { 
        id: 1, 
        mail: 'test@test.com', 
        password: 'hashedPassword' 
      };
      mockUserRepository.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('test@test.com', 'wrongPassword');
      expect(result).toBeNull();
    });

    it('should return user info if validation succeeds', async () => {
      const user = {
        id: 1,
        name: 'Test',
        surname: 'User',
        mail: 'test@test.com',
        password: 'hashedPassword',
        phone: '123456789',
        address: '123 St',
        role: 'user',
      };
      mockUserRepository.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@test.com', 'password');
      expect(result).toEqual({
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          address: user.address,
          surname: user.surname,
          role: user.role,
        },
      });
    });
  });
});
