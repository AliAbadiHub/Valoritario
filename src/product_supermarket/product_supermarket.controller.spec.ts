import { Test, TestingModule } from '@nestjs/testing';
import { ProductSupermarketController } from './product_supermarket.controller';
import { ProductSupermarketService } from './product_supermarket.service';

describe('ProductSupermarketController', () => {
  let controller: ProductSupermarketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSupermarketController],
      providers: [ProductSupermarketService],
    }).compile();

    controller = module.get<ProductSupermarketController>(ProductSupermarketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
