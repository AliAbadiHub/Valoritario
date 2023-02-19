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

  createProduct(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create({
      ...createProductDto,
      createdAt: new Date(),
    });
    return this.productRepository.save(newProduct);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(productId: number): Promise<Product> {
    return this.productRepository.findOne({ where: { productId } });
  }

  async updateProduct(
    productId: number,
    updateProductDetails: UpdateProductDto,
  ) {
    const productToUpdate = await this.findOne(productId);
    const updatedProduct = {
      ...productToUpdate,
      ...updateProductDetails,
      updatedAt: new Date(),
    };
    return this.productRepository.save(updatedProduct);
  }

  async deleteProduct(productId: number) {
    const productToDelete = await this.findOne(productId);
    return this.productRepository.remove(productToDelete);
  }
}
