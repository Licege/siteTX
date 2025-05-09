import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'Уникальный email',
  })
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
  @IsString({ message: 'Неверный тип данных' })
  @IsNotEmpty({ message: 'Не должно быть пустым' })
  readonly lastName: string;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя',
  })
  @IsString({ message: 'Неверный тип данных' })
  @IsNotEmpty({ message: 'Не должно быть пустым' })
  readonly firstName: string;

  @ApiPropertyOptional({
    example: 'Иванович',
    description: 'Отчество',
    required: false,
  })
  readonly patronymic?: string;

  @ApiPropertyOptional({
    example: 'http://localhost:5000/uploads/user-avatar.jpg',
    description: 'Аватарка',
    required: false,
  })
  readonly avatar?: string;

  @ApiPropertyOptional({
    example: '88005553535',
    description: 'Телефон',
  })
  readonly phone?: string;

  @ApiPropertyOptional({
    example: '2021-04-24 19:19:56.155000 +00:00',
    description: 'Дата рождения',
  })
  readonly dateOfBirthday?: string;
}
