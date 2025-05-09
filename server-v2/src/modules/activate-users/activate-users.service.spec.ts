import { Test, TestingModule } from '@nestjs/testing';
import { ActivateUsersService } from './activate-users.service';

describe('ActivateUsersService', () => {
  let service: ActivateUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivateUsersService],
    }).compile();

    service = module.get<ActivateUsersService>(ActivateUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
