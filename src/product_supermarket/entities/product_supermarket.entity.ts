import { Product } from 'src/products/entities/product.entity';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'product_supermarket' })
@Unique(['productId', 'supermarketId'])
export class ProductSupermarket {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Supermarket, { onDelete: 'CASCADE' })
  supermarket: Supermarket;

  @Column({ nullable: false })
  price: number;
}
