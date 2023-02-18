import { Module } from '@nestjs/common';
import { SupermarketsService } from './supermarkets.service';
import { SupermarketsController } from './supermarkets.controller';

@Module({
  controllers: [SupermarketsController],
  providers: [SupermarketsService]
})
export class SupermarketsModule {}
