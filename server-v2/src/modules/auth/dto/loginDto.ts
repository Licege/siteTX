import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'Уникальный email',
  })
  readonly email: string;

  @ApiProperty({
    example: 'qwertyui',
    description: 'Пароль',
  })
  readonly password: string;
}
