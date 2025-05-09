import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { File } from './file.model';
import { FileManipulatorModule } from '../file-manipulator';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
  imports: [SequelizeModule.forFeature([File]), FileManipulatorModule],
})
export class FilesModule {}
