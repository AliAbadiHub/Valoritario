import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductSupermarket } from 'src/product_supermarkets/entities/product_supermarket.entity';
import { ShoppingList } from 'src/shopping-lists/entities/shopping-list.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { User } from 'src/users/entities/user.entity';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    'dist/**/*.entity.js',
    'src/supermarkets/entities/supermarket.entity.ts',
  ],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
