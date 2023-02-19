import { Module } from '@nestjs/common';
import { PriceService } from './prices.service';
import { PriceController } from './prices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Price, Product])],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PricesModule {}
