import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Presentation } from './entities/presentation.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductPriceHistory } from './entities/product-price-history.entity';
import { Repository } from 'typeorm';
import { CreatePresentationDto } from './dto/create-presentation.dto';

describe('ProductsService - Create Presentation', () => {
  let service: ProductsService;
  let productsRepository: Repository<Product>;
  let presentationRepository: Repository<Presentation>;

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
  } as Product;

  const mockPresentation = {
    id: 1,
    name: 'Test Presentation',
    price: 50,
    flavour: 'Chocolate',
    product: mockProduct,
  } as Presentation;

  const mockProductsRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockPresentationRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockProductImageRepository = {};
  const mockProductPriceHistoryRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductsRepository,
        },
        {
          provide: getRepositoryToken(Presentation),
          useValue: mockPresentationRepository,
        },
        {
          provide: getRepositoryToken(ProductImage),
          useValue: mockProductImageRepository,
        },
        {
          provide: getRepositoryToken(ProductPriceHistory),
          useValue: mockProductPriceHistoryRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
    presentationRepository = module.get<Repository<Presentation>>(getRepositoryToken(Presentation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a presentation successfully', async () => {
    const createDto: CreatePresentationDto = {
      name: 'Test Presentation',
      price: 50,
      flavour: 'Chocolate',
      description: 'Test Description',
      stock: 10,
      display: true,
    };

    mockProductsRepository.findOne.mockResolvedValue(mockProduct);
    mockPresentationRepository.create.mockReturnValue(mockPresentation);
    mockPresentationRepository.save.mockResolvedValue(mockPresentation);

    const result = await service.createPresentation(1, createDto);

    expect(mockProductsRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockPresentationRepository.create).toHaveBeenCalledWith({
      ...createDto,
      product: mockProduct,
    });
    expect(mockPresentationRepository.save).toHaveBeenCalledWith(mockPresentation);
    expect(result).toEqual(mockPresentation);
  });

  it('should throw an error if product not found', async () => {
    const createDto: CreatePresentationDto = {
      name: 'Test Presentation',
      price: 50,
      flavour: 'Chocolate',
      description: 'Test Description',
      stock: 10,
      display: true,
    };

    mockProductsRepository.findOne.mockResolvedValue(null);

    await expect(service.createPresentation(999, createDto)).rejects.toThrow('Product with ID 999 not found');
  });
});
