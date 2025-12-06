import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

const mockUsersRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const createUserDto = {
        name: 'Test',
        surname: 'User',
        mail: 'test@test.com',
        password: 'password123',
        phone: '123456789',
        address: {},
      };
      
      mockUsersRepository.create.mockReturnValue(createUserDto);
      mockUsersRepository.save.mockResolvedValue({ id: 1, ...createUserDto });

      const result = await service.create(createUserDto);
      expect(result).toEqual({ id: 1, ...createUserDto });
      expect(mockUsersRepository.create).toHaveBeenCalled();
      expect(mockUsersRepository.save).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, name: 'Test' };
      mockUsersRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
