import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Supermarket } from './entities/supermarket.entity';
import { SupermarketsController } from './supermarkets.controller';
import { SupermarketsService } from './supermarkets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supermarket, Product])],
  controllers: [SupermarketsController],
  providers: [SupermarketsService],
})
export class SupermarketsModule {}
