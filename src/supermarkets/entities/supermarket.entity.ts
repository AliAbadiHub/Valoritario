import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'supermarkets' })
export class Supermarket {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  supermarketId: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.supermarket)
  products: Product[];
}
