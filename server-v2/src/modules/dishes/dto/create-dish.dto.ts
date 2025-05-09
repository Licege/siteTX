import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDishDto {
  @ApiProperty({ example: 'Борщ', description: 'Наименование блюда' })
  readonly title: string;

  @ApiPropertyOptional({
    example: 'Очень вкусный борщ',
    description: 'Описание блюда',
  })
  readonly description: string;

  @ApiPropertyOptional({ example: '320', description: 'Выход порции, грамм' })
  readonly weight: number;

  @ApiProperty({ example: '430', description: 'Цена' })
  readonly cost: number;

  @ApiPropertyOptional({
    example: 'true',
    description: 'Доступна ли опция доставки',
  })
  readonly isDelivery: boolean;

  @ApiPropertyOptional({
    example: 'http://localhost:9090/uploads/borsch.jpg',
    description: 'Иллюстрация блюда',
  })
  readonly imageSrc: string;
}
