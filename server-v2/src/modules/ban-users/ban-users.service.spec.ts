import { Test, TestingModule } from '@nestjs/testing';
import { BanUsersService } from './ban-users.service';

describe('BanUsersService', () => {
  let service: BanUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BanUsersService],
    }).compile();

    service = module.get<BanUsersService>(BanUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
