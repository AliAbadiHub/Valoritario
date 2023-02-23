import { Test, TestingModule } from '@nestjs/testing';
import { RedisCacheService } from './cache.service';

describe('RedisCacheService', () => {
  let service: RedisCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisCacheService],
    }).compile();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
