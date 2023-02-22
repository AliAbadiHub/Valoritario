import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductSupermarketDto } from './dto/create-product_supermarket.dto';
import { UpdateProductSupermarketDto } from './dto/update-product_supermarket.dto';
import { ProductSupermarket } from './entities/product_supermarket.entity';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductSupermarketsService {
  constructor(
    @InjectRepository(ProductSupermarket)
    private readonly productSupermarketRepository: Repository<ProductSupermarket>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Supermarket)
    private readonly supermarketRepository: Repository<Supermarket>,
  ) {}

  async createProductSupermarket(
    createProductSupermarketDto: CreateProductSupermarketDto,
  ): Promise<ProductSupermarket> {
    const { price, productId, supermarketId } = createProductSupermarketDto;
    const product = await this.productRepository.findOneByOrFail({ productId });
    const supermarket = await this.supermarketRepository.findOneByOrFail({
      supermarketId,
    });

    const newProductSupermarket = new ProductSupermarket();
    newProductSupermarket.price = price;
    newProductSupermarket.product = product;
    newProductSupermarket.supermarket = supermarket;

    return this.productSupermarketRepository.save(newProductSupermarket);
  }

  findAll() {
    return this.productSupermarketRepository.find();
  }

  async findOne(id: number): Promise<ProductSupermarket> {
    return this.productSupermarketRepository.findOneByOrFail({ id });
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
