/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { ProductSupermarket } from '../product_supermarkets/entities/product_supermarket.entity';
import { ShoppingList } from './entities/shopping-list.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ProductSupermarket)
    private readonly productSupermarketRepository: Repository<ProductSupermarket>,
    @InjectRepository(ShoppingList)
    private readonly shoppingListRepository: Repository<ShoppingList>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {}

  async create(dto: CreateShoppingListDto, cityName: string, username: string) {
    try {
      const user = await this.userRepository.findOneBy({ username });
      if (!user) {
        throw new NotFoundException('Username is not found');
      }
      
      const { items } = dto;
  
      const shoppingList = [];
  
      for (const item of items) {
        const lowestPriceProductSupermarkets =
          await this.productSupermarketRepository
            .createQueryBuilder('ps')
            .where('ps.productId = :productId', { productId: item.productId })
            .andWhere('supermarket.city = :cityName', { cityName: cityName })
            .orderBy('ps.price', 'ASC')
            .leftJoinAndSelect('ps.product', 'product')
            .leftJoinAndSelect('ps.supermarket', 'supermarket')
            .getMany();
  
        const shoppingListItem = {
          product: lowestPriceProductSupermarkets[0].product.productName,
          supermarket: lowestPriceProductSupermarkets[0].supermarket.supermarketName,
          pricePerProduct: lowestPriceProductSupermarkets[0].price,
          quantity: item.quantity,
          total: (lowestPriceProductSupermarkets[0].price * item.quantity).toFixed(2),
        };
  
        shoppingList.push(shoppingListItem);
      }
      
  
      const totalPrice = shoppingList.reduce(
        (acc, curr) => acc + Number(curr.total),
        0,
      );  
      return {
        username,
        cityName,
        totalPrice: totalPrice.toFixed(2),
        shoppingList,
      };
    } catch (error) {
      console.error(error);
      return { error: 'Error creating shopping list' };
    }
  }
  async delete(id: number) {
    await this.shoppingListRepository.delete(id);
  }
}
