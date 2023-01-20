import {
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { BanUser } from '../ban-users/ban-users.model';
import { ActivateUser } from '../activate-users/activate-users.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  activationLink: string;
  avatar?: string;
}

@Table({ tableName: 'Users', paranoid: true })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'example@mail.com',
    description: 'Уникальный email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @ApiProperty({
    example: 'qwertyui',
    description: 'Пароль',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({
    example: 'Иванович',
    description: 'Отчество',
  })
  @Column({
    type: DataType.STRING,
  })
  patronymic: string;

  @ApiProperty({
    example: 'http://localhost:5000/uploads/user-avatar.jpg',
    description: 'Аватарка',
  })
  @Column({
    type: DataType.STRING,
  })
  avatar: string;

  @ApiProperty({
    example: '88005553535',
    description: 'Телефон',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: '2021-04-24 19:19:56.155000 +00:00',
    description: 'Дата рождения',
  })
  @Column({
    type: DataType.DATE,
  })
  dateOfBirthday: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasOne(() => BanUser)
  banned: BanUser;

  @HasOne(() => ActivateUser)
  activate: ActivateUser;
}
