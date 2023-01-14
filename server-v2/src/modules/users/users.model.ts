import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  surname: string;
  forename: string;
  avatar?: string;
}

@Table({ tableName: 'Users', paranoid: true })
export class User extends Model<User, UserCreationAttrs> {
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
  surname: string;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  forename: string;

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
  birthday: string;

  // TODO Вынести в отдельную таблицу и добавить причину блокировки
  @ApiProperty({
    example: 'false',
    description: 'Заблокирован ли пользователь',
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  blocked: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
