import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductSupermarket } from 'src/product_supermarkets/entities/product_supermarket.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'shopping_lists' })
export class ShoppingList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column('simple-json', { nullable: false })
  products: { productId: number; quantity: number }[];

  @ManyToOne(() => User, (user) => user.shoppingList)
  user: User;

  @OneToMany(
    () => ProductSupermarket,
    (productSupermarket) => productSupermarket.shoppingList,
  )
  items: ProductSupermarket[];

  @ManyToOne(() => Supermarket, (supermarket) => supermarket.shoppingLists)
  supermarket: Supermarket;
}
