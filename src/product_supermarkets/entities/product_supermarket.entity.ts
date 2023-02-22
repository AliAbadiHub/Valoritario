import { Product } from 'src/products/entities/product.entity';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_supermarket' })
export class ProductSupermarket {
  @PrimaryGeneratedColumn()
  id: number;

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
}
