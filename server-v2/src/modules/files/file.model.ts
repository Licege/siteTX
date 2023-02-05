import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface FileCreationAttrs {
  name: string;
  originalName: string;
  preview: string;
}

@Table({ tableName: 'Files' })
export class File extends Model<File, FileCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'Имя файла' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ description: 'Оригинальное имя файла' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originalName: string;

  @ApiProperty({ description: 'Имя превью файла или уменьшенной копии' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  preview: string;
}
