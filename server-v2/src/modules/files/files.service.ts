import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './file.model';
import { FileManipulatorService } from '@/modules/file-manipulator/file-manipulator.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File) private fileRepository: typeof File,
    private fileManipulatorService: FileManipulatorService,
  ) {}

  async saveFile(file): Promise<File> {
    try {
      const savedFile = await this.fileManipulatorService.saveFile(file);

      return this.fileRepository.create({
        originalName: savedFile.originalName,
        name: savedFile.name,
        preview: savedFile.preview,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async saveFiles(files): Promise<File[]> {
    return Promise.all(files.map((file) => this.saveFile(file)));
  }

  getFile(fileName: string): StreamableFile {
    return this.fileManipulatorService.getFile(fileName);
  }

  async getFilesRecords(filesIds: number[]): Promise<File[]> {
    return this.fileRepository.findAll({ where: { id: filesIds } });
  }
}
