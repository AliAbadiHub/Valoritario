import { Module } from '@nestjs/common';
import { SupermarketsService } from './supermarkets.service';
import { SupermarketsController } from './supermarkets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supermarket } from './entities/supermarket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supermarket])],
  controllers: [SupermarketsController],
  providers: [SupermarketsService],
})
export class SupermarketsModule {}
