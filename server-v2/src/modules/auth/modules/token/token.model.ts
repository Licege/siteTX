import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../../../users/users.model';

interface TokenCreationAttrs {
  userId: number;
  refreshToken: string;
  clientIp?: string;
}

// TODO перенести в Redis
@Table({ tableName: 'Tokens' })
export class Token extends Model<Token, TokenCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '2',
    description: 'Уникальный идентификатор пользователя',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({
    example: 'токен',
    description: 'Refresh токен пользователя',
  })
  @Column({
    type: DataType.STRING,
  })
  refreshToken: string;

  @ApiPropertyOptional({
    example: 'ip-адрес',
    description: 'Ip-адрес пользователя',
  })
  @Column({
    type: DataType.STRING,
  })
  clientIp: string;
}
