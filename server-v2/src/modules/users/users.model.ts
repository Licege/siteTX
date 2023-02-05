import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { BanUser } from '../ban-users/ban-users.model';
import { ActivateUser } from '../activate-users/activate-users.model';
import { Address } from '@/modules/addresses/addresses.model';
import { UserAddresses } from '@/modules/users/user-addresses.model';
import { File } from '@/modules/files/file.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  activationLink: string;
  avatarId?: number;
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

  @ApiProperty({
    example: '1',
    description: 'Id файла - аватарки',
  })
  @Column({
    type: DataType.INTEGER,
    onDelete: 'SET NULL',
  })
  @ForeignKey(() => File)
  avatarId: number;

  @BelongsTo(() => File)
  avatar: File;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @BelongsToMany(() => Address, () => UserAddresses)
  addresses: Address[];

  @HasOne(() => BanUser)
  banned: BanUser;

  @HasOne(() => ActivateUser)
  activate: ActivateUser;
}
