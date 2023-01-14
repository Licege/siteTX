import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'Уникальный email',
  })
  @IsString({ message: 'Неверный тип данных' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({
    example: 'qwertyui',
    description: 'Пароль',
  })
  @IsString({ message: 'Неверный тип данных' })
  @Length(8, 16, { message: 'Не менее 8 и не более 16 символов' })
  readonly password: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия',
  })
  readonly surname: string;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя',
  })
  readonly forename: string;

  @ApiProperty({
    example: 'Иванович',
    description: 'Отчество',
    required: false,
  })
  readonly patronymic?: string;

  @ApiProperty({
    example: 'http://localhost:5000/uploads/user-avatar.jpg',
    description: 'Аватарка',
    required: false,
  })
  readonly avatar?: string;

  @ApiProperty({
    example: '88005553535',
    description: 'Телефон',
    required: false,
  })
  readonly phone?: string;

  @ApiProperty({
    example: '2021-04-24 19:19:56.155000 +00:00',
    description: 'Дата рождения',
    required: false,
  })
  readonly birthday?: string;
}
