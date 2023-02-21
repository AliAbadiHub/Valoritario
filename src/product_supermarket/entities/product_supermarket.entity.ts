import { Product } from 'src/products/entities/product.entity';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_supermarket' })
export class ProductSupermarket {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  productId: number;

  @Column()
  supermarketId: number;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Supermarket, { onDelete: 'CASCADE' })
  supermarket: Supermarket;
}
