import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;
  let productImageRepository: Repository<ProductImage>;

  const mockProductRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockProductImageRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(ProductImage),
          useValue: mockProductImageRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
    productImageRepository = module.get<Repository<ProductImage>>(getRepositoryToken(ProductImage));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto = { name: 'Test Product' } as any;
      const result = { id: 1, ...dto };
      mockProductRepository.create.mockReturnValue(result);
      mockProductRepository.save.mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const products = [{ id: 1, name: 'Product 1' }];
      mockProductRepository.findAndCount.mockResolvedValue([products, 1]);

      const result = await service.findAll(1, 10);
      expect(result).toEqual({
        products,
        totalPages: 1,
        hasNextPage: false,
      });
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const product = { id: 1, name: 'Product 1' };
      mockProductRepository.findOne.mockResolvedValue(product);

      expect(await service.findOne(1)).toEqual(product);
    });
  });

  describe('update', () => {
    it('should update and return the product', async () => {
      const dto = { name: 'Updated Product' } as any;
      const product = { id: 1, ...dto };
      mockProductRepository.update.mockResolvedValue(undefined);
      mockProductRepository.findOne.mockResolvedValue(product);

      expect(await service.update(1, dto)).toEqual(product);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      mockProductRepository.delete.mockResolvedValue(undefined);
      await service.delete(1);
      expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('getPrice', () => {
    it('should calculate price with discount', async () => {
      const product = { id: 1, price: 100, discount: 10, presentation: [] };
      mockProductRepository.findOne.mockResolvedValue(product);
      
      // 100 * (1 - 0.1) = 90
      expect(await service.getPrice(1, 1)).toBe(90);
    });

    it('should calculate price with quantity discount', async () => {
      const product = { id: 1, price: 100, discount: 10, presentation: [] };
      mockProductRepository.findOne.mockResolvedValue(product);
      process.env.DESCUENTO = "0.1";

      // 100 * 0.9 = 90
      // 90 * 5 * (1 - 0.1) = 450 * 0.9 = 405
      expect(await service.getPrice(1, 5)).toBe(405);
    });
  });
});
