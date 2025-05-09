import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Restaurant } from '@/modules/restaurants/restaurants.model';
import { MenuImagesType } from '@/modules/menu-images/menu-images.types';

interface MenuImagesCreationAttrs {
  type: string;
  images: number[];
  restaurantId: number;
}

@Table({ tableName: 'MenuImages' })
export class MenuImages extends Model<MenuImages, MenuImagesCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'bar',
    description: 'Тип меню',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: MenuImagesType;

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: [],
    allowNull: false,
  })
  images: number[];

  @ApiProperty({
    description: 'Уникальный идентификатор ресторана',
  })
  @ForeignKey(() => Restaurant)
  @Column({
    onDelete: 'SET NULL',
  })
  restaurantId: number;
}
