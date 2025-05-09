import { Test, TestingModule } from '@nestjs/testing';
import { ActivateUsersController } from './activate-users.controller';

describe('ActivateUsersController', () => {
  let controller: ActivateUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivateUsersController],
    }).compile();

    controller = module.get<ActivateUsersController>(ActivateUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
