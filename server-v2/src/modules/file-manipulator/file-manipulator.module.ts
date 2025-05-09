import { Module } from '@nestjs/common';
import { FileManipulatorService } from './file-manipulator.service';

@Module({
  providers: [FileManipulatorService],
  exports: [FileManipulatorService],
})
export class FileManipulatorModule {}
