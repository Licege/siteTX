import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@/modules/users/users.model';
import { Address } from '@/modules/addresses/addresses.model';

@Table({ tableName: 'UserAddresses', timestamps: false })
export class UserAddresses extends Model<UserAddresses> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор пользователя',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор адреса',
  })
  @ForeignKey(() => Address)
  @Column({ type: DataType.INTEGER })
  addressId: number;
}
