import { Module } from '@nestjs/common';
import { ProductSupermarketsService } from './product_supermarkets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSupermarket } from './entities/product_supermarket.entity';
import { ProductSupermarketController } from './product_supermarkets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSupermarket])],
  controllers: [ProductSupermarketController],
  providers: [ProductSupermarketsService],
})
export class ProductSupermarketsModule {}
