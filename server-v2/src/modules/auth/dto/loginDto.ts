import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
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
}
