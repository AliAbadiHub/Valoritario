import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSupermarket } from 'src/product_supermarkets/entities/product_supermarket.entity';
import { Repository } from 'typeorm';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { ShoppingList } from './entities/shopping-list.entity';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ProductSupermarket)
    private readonly productSupermarketRepository: Repository<ProductSupermarket>,
    @InjectRepository(ShoppingList)
    private readonly shoppingListRepository: Repository<ShoppingList>,
  ) {}

  async getShoppingList(shoppingList: CreateShoppingListDto[]): Promise<any> {
    // Verify that all the product names are valid
    const productNames = shoppingList.map((item) => item.productName);

    // Map product names to prices
    const pricesMap = new Map<string, any[]>();
    for (const productName of productNames) {
      try {
        const prices = await this.productSupermarketRepository
          .createQueryBuilder('productSupermarket')
          .innerJoinAndSelect('productSupermarket.product', 'product')
          .innerJoinAndSelect('productSupermarket.supermarket', 'supermarket')
          .where('product.productName = :productName', { productName })
          .orderBy('productSupermarket.price')
          .select([
            'product.productName',
            'productSupermarket.price',
            'supermarket.supermarketName',
          ])
          .getMany();

        pricesMap.set(productName, prices);
      } catch (error) {
        // Handle the error (e.g., log it, return a specific error message, etc.)
        console.error(
          `Error retrieving prices for product "${productName}":`,
          error,
        );
      }
    }

    // Map prices to shopping list items with prices and supermarket names
    const shoppingListItems = []
      .concat(...Array.from(pricesMap.values()))
      .sort((a, b) => a.price - b.price)
      .map((productPrice) => ({
        productName: productPrice.product.productName,
        price: productPrice.price,
        supermarketName: productPrice.supermarket.supermarketName,
      }));

    // Create a new shopping list
    const newShoppingList = new ShoppingList();
    newShoppingList.createdAt = new Date();
    newShoppingList.updatedAt = new Date();
    newShoppingList.items = shoppingListItems;

    // Save the shopping list
    const savedShoppingList = await this.shoppingListRepository.save(
      newShoppingList,
    );

    return savedShoppingList;
  }
}
