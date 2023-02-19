import { Price } from 'src/prices/entities/price.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  productId: number;

  @Column()
  productName: string;

  @Column()
  brandName: string;

  @Column()
  size: string;

  @Column()
  comments: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Price, (price) => price.product)
  price: Price[];
}
