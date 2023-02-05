import { Test, TestingModule } from '@nestjs/testing';
import { FileManipulatorService } from './file-manipulator.service';

describe('FileManipulatorService', () => {
  let service: FileManipulatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileManipulatorService],
    }).compile();

    service = module.get<FileManipulatorService>(FileManipulatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
