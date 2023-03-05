import { ProductSupermarket } from 'src/product_supermarkets/entities/product_supermarket.entity';
import { ShoppingList } from 'src/shopping-lists/entities/shopping-list.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'supermarkets' })
export class Supermarket {
  @PrimaryGeneratedColumn()
  supermarketId: number;

  @Column({ nullable: false, unique: true })
  supermarketName: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  supermarketComment: string;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(
    () => ProductSupermarket,
    (productSupermarket) => productSupermarket.supermarket,
    {
      cascade: ['remove'],
    },
  )
  @JoinColumn({ name: 'supermarketId', referencedColumnName: 'supermarketId' })
  productSupermarket: ProductSupermarket[];

  @OneToMany(() => ShoppingList, (shoppingList) => shoppingList.supermarket)
  @JoinColumn({
    name: 'supermarketName',
    referencedColumnName: 'supermarketName',
  })
  shoppingLists: ShoppingList[];
}
