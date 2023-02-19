import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'prices' })
export class Price {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'float' })
  price: number;

  @Column()
  currency: string;

  @Column()
  quantity: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  comments: string;

  // @Column()
  // supermarketId: number;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.price)
  product: Product;
}
