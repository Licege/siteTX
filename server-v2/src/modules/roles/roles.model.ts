import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from './user-roles.model';
import { User } from '../users/users.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'Roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'USER', description: 'Уникальное значение роли' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: number;

  @ApiProperty({
    example: 'Пользователь',
    description: 'Описание роли',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  description: number;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
