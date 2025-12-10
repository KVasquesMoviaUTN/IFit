import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = { name: 'Test', surname: 'User', mail: 'test@test.com', password: 'password', phone: '123', address: {} };
      const result: Users = { id: 1, ...dto, role: 'user', createdAt: new Date(), updatedAt: new Date(), sales: [], shifts: [] };
      
      mockUsersService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    });

    it('should throw HttpException on duplicate email', async () => {
      const dto: CreateUserDto = { name: 'Test', surname: 'User', mail: 'test@test.com', password: 'password', phone: '123', address: {} };
      mockUsersService.create.mockRejectedValue(new Error('El correo electrónico ya está en uso. Por favor, elija otro.'));

      await expect(controller.create(dto)).rejects.toThrow(new HttpException('El correo electrónico ya está en uso. Por favor, elija otro.', HttpStatus.BAD_REQUEST));
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: Users[] = [{ id: 1, name: 'Test', surname: 'User', mail: 'test@test.com', password: 'password', phone: '123', address: {}, role: 'user', createdAt: new Date(), updatedAt: new Date(), sales: [], shifts: [] }];
      mockUsersService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result: Users = { id: 1, name: 'Test', surname: 'User', mail: 'test@test.com', password: 'password', phone: '123', address: {}, role: 'user', createdAt: new Date(), updatedAt: new Date(), sales: [], shifts: [] };
      mockUsersService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(1, { user: { role: 'admin', userId: 1 } })).toBe(result);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto: UpdateUserDto = { name: 'Updated', address: {} };
      const result: Users = { id: 1, name: 'Updated', surname: 'User', mail: 'test@test.com', password: 'password', phone: '123', address: {}, role: 'user', createdAt: new Date(), updatedAt: new Date(), sales: [], shifts: [] };
      mockUsersService.update.mockResolvedValue(result);

      expect(await controller.update(1, dto, { user: { role: 'admin', userId: 1 } })).toBe(result);
      expect(mockUsersService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      mockUsersService.delete.mockResolvedValue(undefined);

      expect(await controller.remove(1)).toBeUndefined();
      expect(mockUsersService.delete).toHaveBeenCalledWith(1);
    });
  });
});
