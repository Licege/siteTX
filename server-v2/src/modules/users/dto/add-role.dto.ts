import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Неверный тип данных' })
  readonly value: string;

  @IsNumber({}, { message: 'Неверный тип данных' })
  readonly userId: number;
}
