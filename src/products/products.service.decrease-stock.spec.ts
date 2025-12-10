import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductPriceHistory } from './entities/product-price-history.entity';
import { Presentation } from './entities/presentation.entity';

describe('ProductsService - decreaseStock', () => {
  let service: ProductsService;
  let mockProductsRepository;
  let mockQueryBuilder;

  beforeEach(async () => {
    mockQueryBuilder = {
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      execute: jest.fn(),
    };

    mockProductsRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
      manager: {
        createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductsRepository,
        },
        {
          provide: getRepositoryToken(ProductImage),
          useValue: {},
        },
        {
          provide: getRepositoryToken(ProductPriceHistory),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should decrease stock for product using atomic update', async () => {
    mockQueryBuilder.execute.mockResolvedValue({ affected: 1 });

    await service.decreaseStock(1, 5);

    expect(mockProductsRepository.createQueryBuilder).toHaveBeenCalled();
    expect(mockQueryBuilder.update).toHaveBeenCalledWith(Product);
    expect(mockQueryBuilder.set).toHaveBeenCalled();
    expect(mockQueryBuilder.where).toHaveBeenCalledWith("id = :id", { id: 1 });
    expect(mockQueryBuilder.execute).toHaveBeenCalled();
  });

  it('should throw error if insufficient stock for product', async () => {
    mockQueryBuilder.execute.mockResolvedValue({ affected: 0 });
    mockProductsRepository.findOne.mockResolvedValue({ id: 1 }); // Product exists

    await expect(service.decreaseStock(1, 5)).rejects.toThrow('Insufficient stock');
  });

  it('should decrease stock for presentation using atomic update', async () => {
    mockQueryBuilder.execute.mockResolvedValue({ affected: 1 });

    await service.decreaseStock(1, 5, 10); // productId=1, amount=5, presentationId=10

    expect(mockProductsRepository.manager.createQueryBuilder).toHaveBeenCalled();
    expect(mockQueryBuilder.update).toHaveBeenCalledWith(Presentation);
    expect(mockQueryBuilder.where).toHaveBeenCalledWith("id = :id", { id: 10 });
    expect(mockQueryBuilder.execute).toHaveBeenCalled();
  });

  it('should throw error if insufficient stock for presentation', async () => {
    mockQueryBuilder.execute.mockResolvedValue({ affected: 0 });

    await expect(service.decreaseStock(1, 5, 10)).rejects.toThrow('Insufficient stock');
  });
});
