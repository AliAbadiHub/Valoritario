import { ProductSupermarket } from 'src/product_supermarkets/entities/product_supermarket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(
    () => ProductSupermarket,
    (productSupermarket) => productSupermarket.supermarket,
  )
  productSupermarket: ProductSupermarket[];
}
