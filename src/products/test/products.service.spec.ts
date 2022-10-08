import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductsModule } from '../products.module';
import { ProductsService } from '../products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>
  const mockProductRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
    preload: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService,
        {
          provide: getRepositoryToken(Product, 'TesloDB'),
          useValue: mockProductRepository,
        }
      ],
      imports: [ProductsModule],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product, 'TesloDB'))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it(' repository defined.....', ()=>{
    expect(productRepository).toBeDefined()
  })
});
