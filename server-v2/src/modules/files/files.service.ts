import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  // TODO rewrite to async!
  async createFile(file): Promise<string> {
    try {
      const parsedFileName = file.originalname.split('.');
      const ext = parsedFileName.pop();
      const fileName = uuid.v4() + ext;
      const filePath = path.resolve(__dirname, '..', '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (error) {
      throw new HttpException(
        'Ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
