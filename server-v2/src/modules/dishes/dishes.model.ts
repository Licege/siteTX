import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface DishCreationAttrs {
  title: string;
  cost: number;
}

@Table({ tableName: 'Dishes' })
export class Dish extends Model<Dish, DishCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Борщ', description: 'Наименование блюда' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'Очень вкусный борщ', description: 'Описание блюда' })
  @Column({
    type: DataType.TEXT,
    defaultValue: '',
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: '320', description: 'Выход порции, грамм' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  weight: number;

  @ApiProperty({ example: '430', description: 'Цена' })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  cost: number;

  @ApiProperty({ example: 'true', description: 'Доступна ли опция доставки' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  isDelivery: boolean;

  @ApiProperty({
    example: 'http://localhost:5000/uploads/borsch.jpg',
    description: 'Иллюстрация блюда',
  })
  @Column({
    type: DataType.STRING,
  })
  imageSrc: string;
}
