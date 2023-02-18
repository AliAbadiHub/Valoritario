import { Test, TestingModule } from '@nestjs/testing';
import { SupermarketsController } from './supermarkets.controller';
import { SupermarketsService } from './supermarkets.service';

describe('SupermarketsController', () => {
  let controller: SupermarketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupermarketsController],
      providers: [SupermarketsService],
    }).compile();

    controller = module.get<SupermarketsController>(SupermarketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
