import { Product } from 'src/products/entities/product.entity';
import { ProductSupermarket } from 'src/product_supermarkets/entities/product_supermarket.entity';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'shopping-lists' })
export class ShoppingList {
  @PrimaryGeneratedColumn()
  shoppingListId: number;

  @Column({ nullable: false })
  productName: string;

  @Column({ nullable: false })
  supermarketName: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.shoppingList)
  @JoinColumn()
  user: User;

  @OneToMany(() => Supermarket, (supermarket) => supermarket.shoppingList)
  supermarket: Supermarket;

  @OneToMany(() => Product, (product) => product.shoppingList)
  @JoinColumn()
  product: Product;

  @OneToMany(
    () => ProductSupermarket,
    (productSupermarkets) => productSupermarkets.shoppingList,
  )
  @JoinColumn()
  productSupermarkets: ProductSupermarket[];

  @Column('json', { nullable: false })
  items: any[];
}
