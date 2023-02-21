import { Product } from 'src/products/entities/product.entity';
import { ProductSupermarket } from 'src/product_supermarket/entities/product_supermarket.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'supermarkets' })
export class Supermarket {
  @PrimaryGeneratedColumn()
  supermarketId: number;

  @Column({ nullable: false })
  supermarketName: string;

  @Column({ nullable: false })
  supermarketLocation: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToMany(() => Product, { cascade: true })
  products: Product[];

  @OneToMany(
    () => ProductSupermarket,
    (productSupermarket) => productSupermarket.supermarket,
  )
  productSupermarkets: ProductSupermarket[];
}
