import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Supermarket } from '../supermarkets/entities/supermarket.entity';
import { CreateProductSupermarketDto } from './dto/create-product_supermarket.dto';
import { UpdateProductSupermarketDto } from './dto/update-product_supermarket.dto';
import { ProductSupermarket } from './entities/product_supermarket.entity';

@Injectable()
export class ProductSupermarketService {
  constructor(
    @InjectRepository(ProductSupermarket)
    private productSupermarketRepository: Repository<ProductSupermarket>,
  ) {}

  async create(
    createProductSupermarketDto: CreateProductSupermarketDto,
  ): Promise<ProductSupermarket> {
    const product = new Product();
    product.productId = createProductSupermarketDto.productId;

    const supermarket = new Supermarket();
    supermarket.supermarketId = createProductSupermarketDto.supermarketId;

    const productSupermarket = new ProductSupermarket();
    productSupermarket.product = product;
    productSupermarket.supermarket = supermarket;
    productSupermarket.price = createProductSupermarketDto.price;

    return this.productSupermarketRepository.save(productSupermarket);
  }

  async findAll(): Promise<ProductSupermarket[]> {
    return this.productSupermarketRepository.find();
  }

  async findOne(id: number): Promise<ProductSupermarket> {
    return this.productSupermarketRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateProductSupermarketDto: UpdateProductSupermarketDto,
  ): Promise<ProductSupermarket> {
    const productSupermarket =
      await this.productSupermarketRepository.findOneBy({
        id,
      });

    if (!productSupermarket) {
      return null;
    }

    if (updateProductSupermarketDto.price) {
      productSupermarket.price = updateProductSupermarketDto.price;
    }

    return this.productSupermarketRepository.save(productSupermarket);
  }

  async delete(id: number): Promise<void> {
    await this.productSupermarketRepository.delete(id);
  }
}
