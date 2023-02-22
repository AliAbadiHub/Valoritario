import { Test, TestingModule } from '@nestjs/testing';
import { ProductSupermarketsService } from './product_supermarkets.service';

describe('ProductSupermarketsService', () => {
  let service: ProductSupermarketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSupermarketsService],
    }).compile();

    service = module.get<ProductSupermarketsService>(
      ProductSupermarketsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
