import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dtos';
import { Repository } from 'typeorm';
import { validate as IsUuId } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {
  private readonly logger = new Logger('Toma!! error')
  //patron respositorio en el service*************
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productRepository.create(createProductDto);
      await this.productRepository.save(product)
      return product
    } catch (error) {
      console.log(error)
      this.handleExceptionDB(error)
    }


  }

  async findAll(paginationDto: PaginationDto) {
    console.log(paginationDto)
    const { limit = 5, offset = 0 } = paginationDto
    return await this.productRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: string) {
    let product: Product;

    if (IsUuId(id)) {
      product = await this.productRepository.findOneBy({ id: id })
    }
    else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      // product = await queryBuilder.andWhere('product.id = :id', { id }).getOne();
      product = await queryBuilder
        .andWhere('lower(title) =:title or lower(slug) =:slug', {
          title: id.toLocaleLowerCase(),
          slug: id.toLocaleLowerCase(),
        }).getOne();
    }
    //product = await this.productRepository.findOneBy({ slug: id })

    if (!product) {
      throw new NotFoundException(` Product ${id} not found `)
    }

    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto
    })
    try {
      if (!product) throw new NotFoundException(`Product whit id: ${id}`);
      await this.productRepository.save(product);
      return product    
    } catch (error) {
      this.handleExceptionDB(error);
    }
  
  }

  async remove(id: string) {

    const result = await this.findOne(id);

    await this.productRepository.remove(result)

    return ` se elimino ${result}`
  }

  private handleExceptionDB(error: any) {
    this.logger.error(error)
    if (error.code === '23505') { throw new BadRequestException(error.detail) }
    if (error.code === '23502') { throw new BadRequestException(error.detail) }
    throw new InternalServerErrorException('unexpected error')
  }

}
