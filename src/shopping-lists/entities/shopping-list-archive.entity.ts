import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ShoppingList } from './shopping-list.entity';

@Entity({ name: 'shopping_list_archives' })
export class ShoppingListArchive {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  archivedAt: Date;

  @Column('simple-json', { nullable: false })
  products: {
    productName: string;
    supermarketName: string;
    pricePerProduct: number;
    quantity: number;
    total: number;
    createdAt: Date;
  }[];

  @Column({ nullable: false })
  totalPrice: number;

  @Column({ nullable: false })
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username' })
  user: User;

  @OneToOne(
    () => ShoppingList,
    (shoppingList) => shoppingList.shoppingListArchive,
    { eager: true },
  )
  shoppingList: ShoppingList;
}
