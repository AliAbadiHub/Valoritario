import { Test, TestingModule } from '@nestjs/testing';
import { ProductSupermarketsController } from './product_supermarkets.controller';
import { ProductSupermarketsService } from './product_supermarkets.service';

describe('ProductSupermarketsController', () => {
  let controller: ProductSupermarketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSupermarketsController],
      providers: [ProductSupermarketsService],
    }).compile();

    controller = module.get<ProductSupermarketsController>(ProductSupermarketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
