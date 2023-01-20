import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'Уникальный email',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

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
}
