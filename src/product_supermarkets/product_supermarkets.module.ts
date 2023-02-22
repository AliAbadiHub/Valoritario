import { Module } from '@nestjs/common';
import { ProductSupermarketsService } from './product_supermarkets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSupermarket } from './entities/product_supermarket.entity';
import { ProductSupermarketController } from './product_supermarkets.controller';
import { Product } from 'src/products/entities/product.entity';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import { ProductsModule } from 'src/products/products.module';
import { SupermarketsModule } from 'src/supermarkets/supermarkets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductSupermarket, Product, Supermarket]),
    ProductsModule,
    SupermarketsModule,
  ],
  controllers: [ProductSupermarketController],
  providers: [ProductSupermarketsService],
})
export class ProductSupermarketsModule {}
