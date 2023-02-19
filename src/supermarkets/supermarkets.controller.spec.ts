import { Test, TestingModule } from '@nestjs/testing';
import { SupermarketsController } from './supermarkets.controller';

describe('SupermarketsController', () => {
  let controller: SupermarketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupermarketsController],
    }).compile();

    controller = module.get<SupermarketsController>(SupermarketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
