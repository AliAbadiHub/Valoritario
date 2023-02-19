/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './entities/price.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createPrice(productId: number, createPriceDto: CreatePriceDto) {
    const product = await this.productRepository.findOneBy({ productId });
    if (!product) {
      throw new HttpException(
        'Product not found, cannot assign a price',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!product.price) {
      product.price = [];
    }

    const newPrice = this.priceRepository.create({
      ...createPriceDto,
      createdAt: new Date(),
    });

    const savedPrice = await this.priceRepository.save(newPrice);

    product.price.push(savedPrice); // push the new price to the array

    const savedProduct = await this.productRepository.save(product);
    if (!savedProduct) {
      throw new Error('Failed to save product');
    }

    return savedProduct;
  }

  // async createPrice(id: number, createPriceDto: CreatePriceDto) {
  //   const price = this.priceRepository.create(createPriceDto);
  //   const savedPrice = await this.priceRepository.save(price);
  //   return savedPrice;
  // }

  async getPricesByProductId(productId: number) {
    const prices = await this.productRepository.findOneBy({ productId });
    if (!productId)
      throw new HttpException(
        'Product not found, cannot retrieve prices!',
        HttpStatus.BAD_REQUEST,
      );
    return prices;
  }

  async updatePrice(
    id: number,
    updatePriceDto: UpdatePriceDto,
  ): Promise<Price> {
    const priceToUpdate = await this.priceRepository.findOne({
      where: { id },
    });

    if (!priceToUpdate) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }

    priceToUpdate.price = updatePriceDto.price;
    priceToUpdate.currency = updatePriceDto.currency;
    priceToUpdate.quantity = updatePriceDto.quantity;
    priceToUpdate.location = updatePriceDto.location;
    priceToUpdate.comments = updatePriceDto.comments;

    return this.priceRepository.save(priceToUpdate);
  }

  // async getAllPrices(): Promise<Price[]> {
  //   const prices = await this.priceRepository.find();
  //   return prices;
  // }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    const updatedProducts = [];

    for (const product of products) {
      const latestPrice = await this.priceRepository.findOne({
        where: { product: product },
        order: { createdAt: 'DESC' },
      });
      if (latestPrice) {
        const updatedProduct = { ...product, price: [latestPrice] };
        updatedProducts.push(updatedProduct);
      }
    }

    return updatedProducts;
  }

  async deletePrice(id: number) {
    const deletedPrice = await this.priceRepository.delete(id);
    return deletedPrice;
  }
}
