import { ProductSupermarket } from 'src/product_supermarkets/entities/product_supermarket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(
    () => ProductSupermarket,
    (productSupermarket) => productSupermarket.product,
  )
  productSupermarket: ProductSupermarket;
}
