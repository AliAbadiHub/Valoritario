import { Module } from '@nestjs/common';
import { ProductSupermarketsService } from './product_supermarkets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSupermarket } from './entities/product_supermarket.entity';
import { SupermarketsModule } from 'src/supermarkets/supermarkets.module';
import { ProductSupermarketController } from './product_supermarkets.controller';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductSupermarket, Product, Supermarket]),
    SupermarketsModule,
  ],
  controllers: [ProductSupermarketController],
  providers: [ProductSupermarketsService],
  exports: [TypeOrmModule.forFeature([ProductSupermarket])],
})
export class ProductSupermarketsModule {}
