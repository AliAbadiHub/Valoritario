import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { ProductSupermarket } from '../product_supermarkets/entities/product_supermarket.entity';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ProductSupermarket)
    private readonly productSupermarketRepository: Repository<ProductSupermarket>,
  ) {}

  async create(dto: CreateShoppingListDto) {
    const { items, createdAt } = dto;

    const shoppingList = [];

    for (const item of items) {
      const productSupermarkets = await this.productSupermarketRepository.find({
        where: { productId: item.productId },
        relations: ['product', 'supermarket'],
      });

      const shoppingListItem = {
        product: productSupermarkets[0].product.productName,
        supermarket: productSupermarkets[0].supermarket.supermarketName,
        price: productSupermarkets[0].price,
        quantity: item.quantity,
        total: productSupermarkets[0].price * item.quantity,
      };

      shoppingList.push(shoppingListItem);
    }

    return { createdAt, shoppingList };
  }
}
