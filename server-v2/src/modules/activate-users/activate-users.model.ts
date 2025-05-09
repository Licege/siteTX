import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

interface ActivateUserCreationAttrs {
  userId: number;
  activationLink: string;
  isActivated?: boolean;
}

@Table({ tableName: 'ActivateUsers' })
export class ActivateUser extends Model<
  ActivateUser,
  ActivateUserCreationAttrs
> {
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
    unique: true,
  })
  userId: number;

  @ApiProperty({
    example: 'false',
    description: 'Подтвержден ли аккаунт (по умолчанию false)',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isActivated: boolean;

  @ApiProperty({
    example: 'http://localhost/activate-account/fdsfsweqweqweczx',
    description: 'Ссылка для подтверждения аккаунта',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  activationLink: string;
}
