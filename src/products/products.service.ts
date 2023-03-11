import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create({
      ...createProductDto,
      createdAt: new Date(),
    });
    return this.productRepository.save(newProduct);
  }

  findAll(limit: number, offset: number) {
    return this.productRepository.find({
      skip: offset,
      take: limit,
      order: { productId: 'ASC' },
    });
  }

  findOne(productId: number) {
    return this.productRepository.findOneBy({ productId });
  }

  updateProduct(productId: number, updateProductDetails: UpdateProductDto) {
    return this.productRepository.update(
      { productId },
      { ...updateProductDetails, updatedAt: new Date() },
    );
  }

  deleteProduct(productId: number) {
    return this.productRepository.delete({ productId });
  }
}
