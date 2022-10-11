import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dtos';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsController } from '../products.controller';
import { ProductsModule } from '../products.module';
import { ProductsService } from '../products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>
  let controller: ProductsController
  const mockProductRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
    preload: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    create:   jest.fn(),
  }
  const mockProductService: CreateProductDto = {
    title: 'pedro',
    price: 2,
    description: 'lolia',
    slug: 'pero',
    stock: 3,
    sizes: ['sm', 'md', 'xl'],
    gender: 'men'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService,
        {
          provide: getRepositoryToken(Product, 'TesloDB'),
          useValue: mockProductRepository,
        }
      ],
      // imports: [ProductsModule],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product, 'TesloDB'))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it(' repository defined.....', () => {
    expect(productRepository).toBeDefined()
  })
  describe('getAllProducts', () => {
    const mockPaginationDto: PaginationDto = {
      limit: 1,
      offset: 0
    }
    const productMock = {
      id: "6d161f2d-0214-456e-b1c2-bb0c4726a5bf",
      title: "Nike Jordan3",
      price: "0",
      description: "Sweter Negro logo dorado de tipo saltando",
      slug: "luisa_martines",
      stock: "30",
      sizes: [
        "SM",
        "M",
        "L"],
      gender: "women",

    }

    it('should call findall Products', async () => {
      jest.spyOn(mockProductRepository, 'find')
        .mockResolvedValue({
          id: "6d161f2d-0214-456e-b1c2-bb0c4726a5bf",
          title: "Nike Jordan3",
          price: "0",
          description: "Sweter Negro logo dorado de tipo saltando",
          slug: "luisa_martines",
          stock: "30",
          sizes: [
            "SM",
            "M",
            "L"],
          gender: "women",

        })
      const result: any = await service.findAll(mockPaginationDto)
      expect(result).toBeDefined();
      //console.log(result)
      expect(result.title.length).toBeGreaterThan(0)
      expect(result).toBeDefined()

    })
  })
  describe('create a new product', () => {
    it('should create a new product', async () => {
      // jest.spyOn(mockProductRepository,'save').mockResolvedValue({
      //   title: 'pedro',
      //   price: 2,
      //   description: 'lolia',
      //   slug: 'pero',
      //   stock: 3,
      //   sizes: ['sm', 'md', 'xl'],
      //   gender: 'men'
      // })

      // const result: any = await service.create(mockProductService)
      // expect(result).toBeDefined()

    })
  })
});
