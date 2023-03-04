import { ProductSupermarket } from 'src/product_supermarkets/entities/product_supermarket.entity';
import { ShoppingList } from 'src/shopping-lists/entities/shopping-list.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ nullable: false, unique: true })
  productName: string;

  @Column({ nullable: false })
  productCategory: string;

  @Column({ nullable: true })
  productComment: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(
    () => ProductSupermarket,
    (productSupermarket) => productSupermarket.product,
    {
      cascade: ['remove'],
    },
  )
  @JoinColumn({ name: 'productId', referencedColumnName: 'productId' })
  productSupermarket: ProductSupermarket[];

  @OneToMany(() => ShoppingList, (shoppingList) => shoppingList.product)
  shoppingList: ShoppingList[];
}
