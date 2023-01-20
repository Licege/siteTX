import { Test, TestingModule } from '@nestjs/testing';
import { BanUsersController } from './ban-users.controller';

describe('BanUsersController', () => {
  let controller: BanUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BanUsersController],
    }).compile();

    controller = module.get<BanUsersController>(BanUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
