import { Test, TestingModule } from '@nestjs/testing';
import { ProductSupermarketService } from './product_supermarket.service';

describe('ProductSupermarketService', () => {
  let service: ProductSupermarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSupermarketService],
    }).compile();

    service = module.get<ProductSupermarketService>(ProductSupermarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
