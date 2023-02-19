import { Test, TestingModule } from '@nestjs/testing';
import { SupermarketsService } from './supermarkets.service';

describe('SupermarketsService', () => {
  let service: SupermarketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupermarketsService],
    }).compile();

    service = module.get<SupermarketsService>(SupermarketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
