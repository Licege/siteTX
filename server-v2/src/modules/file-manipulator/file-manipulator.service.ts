import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { Injectable, StreamableFile } from '@nestjs/common';
import { UploadedFile } from './file-manipulator.types';
import { createReadStream } from 'fs';

@Injectable()
export class FileManipulatorService {
  async saveFile(file): Promise<UploadedFile> {
    const parsedFileName = file.originalname.split('.');
    const ext = parsedFileName.pop();
    const fileName = `${uuid.v4()}.${ext}`;
    const filePath = path.resolve(__dirname, '..', '..', 'static');

    if (!fs.existsSync(filePath)) {
      await fs.promises.mkdir(filePath, { recursive: true });
    }

    await fs.promises.writeFile(path.join(filePath, fileName), file.buffer);

    return {
      name: fileName,
      preview: fileName,
      originalName: file.originalname,
    };
  }

  getFile(fileName: string): StreamableFile {
    console.log('fileName', fileName);
    const file = createReadStream(
      path.resolve(__dirname, '..', '..', 'static', fileName),
    );

    return new StreamableFile(file);
  }
}
