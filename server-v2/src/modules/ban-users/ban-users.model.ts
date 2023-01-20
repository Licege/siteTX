import {
  Model,
  BelongsTo,
  Column,
  DataType,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../users/users.model';

interface BanUsersAttrs {
  userId: number;
  reason: string;
  dateOfExpiration: Date;
}

@Table({ tableName: 'BannedUsers' })
export class BanUser extends Model<BanUser, BanUsersAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Заказывал доставку и не оплачивал',
    description: 'Причина блокировки',
  })
  @Column({
    type: DataType.STRING,
  })
  reason: string;

  @ApiPropertyOptional({
    example: '2021-04-24 19:19:56.155000 +00:00',
    description: 'Дата окончания срока блокировки, если не задана - бессрочно',
  })
  @Column({
    type: DataType.DATE,
  })
  dateOfExpiration: Date;

  @ApiProperty({
    example: '2',
    description: 'Уникальный идентификатор заблокированного пользователя',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
