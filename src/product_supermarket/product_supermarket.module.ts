import { Module } from '@nestjs/common';
import { ProductSupermarketService } from './product_supermarket.service';
import { ProductSupermarketController } from './product_supermarket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSupermarket } from './entities/product_supermarket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSupermarket])],
  controllers: [ProductSupermarketController],
  providers: [ProductSupermarketService],
})
export class ProductSupermarketModule {}
