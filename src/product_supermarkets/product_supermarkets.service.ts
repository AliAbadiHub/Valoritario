import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductSupermarketDto } from './dto/create-product_supermarket.dto';
import { UpdateProductSupermarketDto } from './dto/update-product_supermarket.dto';
import { ProductSupermarket } from './entities/product_supermarket.entity';

@Injectable()
export class ProductSupermarketsService {
  constructor(
    @InjectRepository(ProductSupermarket)
    private productSupermarketRepository: Repository<ProductSupermarket>,
  ) {}
  async createProductSupermarket(
    id: number,
    createProductSupermarketDto: CreateProductSupermarketDto,
  ) {
    const productSupermarket = await this.productSupermarketRepository.findOne({
      where: { id },
    });
    if (!productSupermarket)
      throw new HttpException(
        'Product not found, cannot create price',
        HttpStatus.BAD_REQUEST,
      );
    const newProductSupermarket = this.productSupermarketRepository.create({
      ...createProductSupermarketDto,
      createdAt: new Date(),
    });
    const savedProductSupermarket =
      await this.productSupermarketRepository.save(newProductSupermarket);
    return savedProductSupermarket;
  }

  findAll() {
    return this.productSupermarketRepository.find();
  }

  async findOne(id: number): Promise<ProductSupermarket> {
    return this.productSupermarketRepository.findOneBy({ id });
  }

  updateProductSupermarket(
    id: number,
    updateProductSupermarketDetails: UpdateProductSupermarketDto,
  ) {
    return this.productSupermarketRepository.update(
      { id },
      { ...updateProductSupermarketDetails, updatedAt: new Date() },
    );
  }

  deleteProductSupermarket(id: number) {
    return this.productSupermarketRepository.delete({ id });
  }
}
