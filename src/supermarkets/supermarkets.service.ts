import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateSupermarketDto } from './dto/create-supermarket.dto';
import { UpdateSupermarketDto } from './dto/update-supermarket.dto';
import { Supermarket } from './entities/supermarket.entity';

@Injectable()
export class SupermarketsService {
  constructor(
    @InjectRepository(Supermarket)
    private readonly supermarketRepository: Repository<Supermarket>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Supermarket[]> {
    return this.supermarketRepository.find();
  }

  async findOne(supermarketId: number): Promise<Supermarket> {
    return this.supermarketRepository.findOneBy({ supermarketId });
  }

  async getProductsBySupermarket(supermarketId: number): Promise<Product[]> {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect(
        'product.prices',
        'price',
        'price.supermarketId = :supermarketId',
        { supermarketId },
      )
      .where('product.supermarketId = :supermarketId', { supermarketId })
      .getMany();
    return products;
  }

  async create(
    createSupermarketDto: CreateSupermarketDto,
  ): Promise<Supermarket> {
    const newSupermarket =
      this.supermarketRepository.create(createSupermarketDto);
    return this.supermarketRepository.save(newSupermarket);
  }

  async update(
    supermarketId: number,
    updateSupermarketDto: UpdateSupermarketDto,
  ): Promise<Supermarket> {
    const existingSupermarket = await this.supermarketRepository.findOneBy({
      supermarketId,
    });
    this.supermarketRepository.merge(existingSupermarket, updateSupermarketDto);
    return this.supermarketRepository.save(existingSupermarket);
  }

  async remove(supermarketId: number): Promise<void> {
    await this.supermarketRepository.delete(supermarketId);
  }

  async addProductToSupermarket(
    supermarketId: number,
    productId: number,
  ): Promise<Supermarket> {
    const supermarket = await this.supermarketRepository.findOneBy({
      supermarketId,
    });
    const product = await this.productRepository.findOneBy({ productId });

    if (!supermarket.products.includes(product)) {
      supermarket.products.push(product);
      await this.supermarketRepository.save(supermarket);
    }

    return supermarket;
  }

  async removeProductFromSupermarket(
    supermarketId: number,
    productId: number,
  ): Promise<Supermarket> {
    const supermarket = await this.supermarketRepository.findOneBy({
      supermarketId,
    });
    const productIndex = supermarket.products.findIndex(
      (p) => p.productId === productId,
    );

    if (productIndex !== -1) {
      supermarket.products.splice(productIndex, 1);
      await this.supermarketRepository.save(supermarket);
    }

    return supermarket;
  }
}
