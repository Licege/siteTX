import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  saveFiles(@UploadedFiles() files) {
    return this.filesService.saveFiles(files);
  }

  @Get(':fileName')
  getFile(@Param('fileName') fileName: string): StreamableFile {
    console.log('fileName 1', fileName);
    return this.filesService.getFile(fileName);
  }
}
