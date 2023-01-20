import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateActivateUserDto {
  @ApiProperty({
    example: '2',
    description: 'Уникальный идентификатор пользователя',
  })
  @IsNumber({}, { message: 'Неверный тип данных' })
  readonly userId: number;

  @ApiProperty({
    example: 'false',
    description: 'Подтвержден ли аккаунт (по умолчанию false)',
  })
  @IsBoolean({ message: 'Неверный тип данных' })
  readonly isActivated: boolean;

  @ApiProperty({
    example: 'http://localhost/activate-account/fdsfsweqweqweczx',
    description: 'Ссылка для подтверждения аккаунта',
  })
  @IsString({ message: 'Неверный тип данных' })
  readonly activationLink: string;
}
