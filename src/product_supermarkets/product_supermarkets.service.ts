import { Injectable, NotFoundException, Param } from '@nestjs/common';
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
    supermarketId: number,
    productId: number,
    createProductSupermarketDto: CreateProductSupermarketDto,
  ): Promise<ProductSupermarket> {
    const { price } = createProductSupermarketDto;
    const product = await this.productRepository.findOneBy({ productId });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    const supermarket = await this.supermarketRepository.findOneBy({
      supermarketId,
    });
    if (!supermarket) {
      throw new NotFoundException(
        `Supermarket with ID ${supermarketId} not found`,
      );
    }
    const newProductSupermarket = new ProductSupermarket();
    newProductSupermarket.price = price;
    newProductSupermarket.product = product;
    newProductSupermarket.supermarket = supermarket;
    newProductSupermarket.productId = productId;
    newProductSupermarket.supermarketId = supermarketId;
    newProductSupermarket.createdAt = new Date();

    return this.productSupermarketRepository.save(newProductSupermarket);
  }

  async findPricesBySupermarket(
    @Param('supermarketId') supermarketId: number,
  ): Promise<any> {
    const supermarket = await this.supermarketRepository.findOneBy({
      supermarketId,
    });
    if (!supermarket) {
      throw new NotFoundException(
        `Supermarket with ID ${supermarketId} not found`,
      );
    }
    const productSupermarkets = await this.productSupermarketRepository.find({
      where: { supermarket: { supermarketId } },
      relations: ['product'],
    });
    const products = productSupermarkets.map((productSupermarket) => ({
      productId: productSupermarket.product.productId,
      productName: productSupermarket.product.productName,
      price: productSupermarket.price,
      city: supermarket.city,
    }));
    return { supermarketName: supermarket.supermarketName, products };
  }

  async getPricesByProduct(
    productId: number,
    cityName: string,
  ): Promise<any[]> {
    return this.productSupermarketRepository
      .createQueryBuilder('productSupermarket')
      .leftJoinAndSelect('productSupermarket.supermarket', 'supermarket')
      .leftJoinAndSelect('productSupermarket.product', 'product')
      .where('productSupermarket.productId = :productId', { productId })
      .andWhere('supermarket.city = :cityName', { cityName })
      .orderBy('productSupermarket.price', 'ASC')
      .select([
        'productSupermarket.price as price',
        'product.productName as productName',
        'supermarket.supermarketName as supermarketName',
        'supermarket.city as city',
      ])
      .getRawMany();
  }

  async updateProductSupermarket(
    supermarketId: number,
    productId: number,
    updateProductSupermarketDto: UpdateProductSupermarketDto,
  ): Promise<ProductSupermarket> {
    const { price } = updateProductSupermarketDto;
    const productSupermarket = await this.productSupermarketRepository.findOne({
      where: { supermarketId, productId },
    });
    if (!productSupermarket) {
      throw new NotFoundException(
        `Inventory with supermarketId ${supermarketId} and productId ${productId} not found`,
      );
    }
    productSupermarket.price = price;
    productSupermarket.updatedAt = new Date();
    return this.productSupermarketRepository.save(productSupermarket);
  }

  deleteProductSupermarket(inventoryId: number) {
    return this.productSupermarketRepository.delete({ inventoryId });
  }

  async findOne(inventoryId: number): Promise<ProductSupermarket> {
    return this.productSupermarketRepository.findOneByOrFail({ inventoryId });
  }

  findAll() {
    return this.productSupermarketRepository.find();
  }
}
