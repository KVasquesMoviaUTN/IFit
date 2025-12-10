import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findNew: jest.fn(),
    findHighlighted: jest.fn(),
    findDiscounted: jest.fn(),
    findOne: jest.fn(),
    findImages: jest.fn(),
    getOriginalPrice: jest.fn(),
    getDiscountPrice: jest.fn(),
    getPrice: jest.fn(),
    getTotalPrice: jest.fn(),
    getTotalFinalPrice: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getPriceHistory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto: CreateProductDto = { name: 'Test Product', price: 100, stock: 10, description: 'Desc', display_order: 1, image: 'img.jpg' };
      const result: Product = { id: 1, ...dto, presentation: [], saleDetail: [], images: [] } as any;
      mockProductsService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(mockProductsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getProducts', () => {
    it('should return a list of products', async () => {
      const result = { products: [], totalPages: 1, hasNextPage: false };
      mockProductsService.findAll.mockResolvedValue(result);

      expect(await controller.getProducts(1, 20)).toBe(result);
      expect(mockProductsService.findAll).toHaveBeenCalledWith(1, 20);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const result: Product = { id: 1, name: 'Test', price: 100, stock: 10, description: 'Desc', display_order: 1, highlight: 'None', discount: 0, image: 'img.jpg', presentation: [], saleDetail: [], images: [] } as any;
      mockProductsService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(mockProductsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const dto: UpdateProductDto = { name: 'Updated' };
      const result: Product = { id: 1, name: 'Updated', price: 100, stock: 10, description: 'Desc', display_order: 1, highlight: 'None', discount: 0, image: 'img.jpg', presentation: [], saleDetail: [], images: [] } as any;
      mockProductsService.update.mockResolvedValue(result);

      expect(await controller.update(1, dto)).toBe(result);
      expect(mockProductsService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      mockProductsService.delete.mockResolvedValue(undefined);

      expect(await controller.remove(1)).toBeUndefined();
      expect(mockProductsService.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('getPriceHistory', () => {
    it('should return price history', async () => {
      const result = [{ id: 1, price: 100, purchase_price: 50, created_at: new Date() }] as any;
      mockProductsService.getPriceHistory.mockResolvedValue(result);

      expect(await controller.getPriceHistory(1)).toBe(result);
      expect(mockProductsService.getPriceHistory).toHaveBeenCalledWith(1);
    });
  });
});
