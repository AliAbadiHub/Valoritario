import { Test, TestingModule } from '@nestjs/testing';
import { ProductSupermarketController } from './product_supermarkets.controller';
import { ProductSupermarketsService } from './product_supermarkets.service';

describe('ProductSupermarketsController', () => {
  let controller: ProductSupermarketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSupermarketController],
      providers: [ProductSupermarketsService],
    }).compile();

    controller = module.get<ProductSupermarketController>(
      ProductSupermarketController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
