import { Product } from 'src/products/entities/product.entity';
import { ShoppingList } from 'src/shopping-lists/entities/shopping-list.entity';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'inventory' })
@Unique(['productId', 'supermarketId'])
export class ProductSupermarket {
  @PrimaryGeneratedColumn()
  inventoryId: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ nullable: false })
  supermarketId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.productSupermarket)
  product: Product;

  @ManyToOne(() => Supermarket, (supermarket) => supermarket.productSupermarket)
  supermarket: Supermarket;

  @ManyToOne(
    () => ShoppingList,
    (shoppingList) => shoppingList.productSupermarkets,
  )
  shoppingList: ShoppingList;
}
