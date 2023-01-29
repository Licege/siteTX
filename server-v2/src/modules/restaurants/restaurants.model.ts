import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Address } from '@/modules/addresses/addresses.model';
import { IsArray, IsMobilePhone, Length } from 'class-validator';

interface RestaurantCreationAttrs {
  title: string;
  addressId: number;
  openHours: Array<string>;
  phone: string;
  vk?: string;
  fb?: string;
  tg?: string;
  inst?: string;
  google?: string;
  tw?: string;
}

@Table({ tableName: 'Restaurants', paranoid: true })
export class Restaurant extends Model<Restaurant, RestaurantCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Три холма',
    description: 'Название ресторана',
  })
  @Length(1)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: '[Пн-Вc: 12:00 - 01:00]',
    description: 'Рабочие часы ресторана',
  })
  @IsArray({ message: 'Некорректный тип данных' })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  openHours: string[];

  @ApiProperty({
    description: 'Уникальный идентификатор адреса',
  })
  @ForeignKey(() => Address)
  @Column({
    onDelete: 'SET NULL',
  })
  addressId: number;

  @ApiProperty({
    description: 'Адрес ресторана',
  })
  @BelongsTo(() => Address)
  address: Address;

  @ApiPropertyOptional({
    description: 'Флаг для указания основного ресторана при загрузке сайта',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isMain: boolean;

  @ApiPropertyOptional({
    description: 'Телефон',
  })
  @IsMobilePhone('ru-RU', {}, { message: 'Неверный формат номера' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @ApiPropertyOptional({
    description: 'Ссылка на группу в Vkontakte',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  vk: string;

  @ApiPropertyOptional({
    description: 'Ссылка на страницу в Instagram',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  inst: string;

  @ApiPropertyOptional({
    description: 'Ссылка на страницу в Facebook',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  fb: string;

  @ApiPropertyOptional({
    description: 'Ссылка на страницу в Telegram',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  tg: string;

  @ApiPropertyOptional({
    description: 'Ссылка на страницу в Twitter',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  tw: string;
}
