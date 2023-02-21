import { ProductSupermarket } from 'src/product_supermarket/entities/product_supermarket.entity';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  productId: number;

  @Column({ nullable: false })
  productName: string;

  @Column({ nullable: false })
  productBrand: string;

  @Column({ nullable: false })
  productSize: string;

  @Column({ nullable: false })
  productCategory: string;

  @Column({ nullable: true })
  productComment: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToMany(() => Supermarket, { cascade: true })
  supermarkets: Supermarket[];

  @OneToMany(
    () => ProductSupermarket,
    (productSupermarket) => productSupermarket.product,
  )
  productSupermarkets: ProductSupermarket[];
}
