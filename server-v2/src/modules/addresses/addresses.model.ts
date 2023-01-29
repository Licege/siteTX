import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { City } from '@/modules/cities/cities.model';

interface AddressCreationAttrs {
  cityId: number;
  street: string;
  house: string;
  flat?: string;
  floor?: string;
  intercom?: string;
}

@Table({ tableName: 'Addresses' })
export class Address extends Model<Address, AddressCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Московская',
    description: 'Улица',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @ApiProperty({
    example: '10а',
    description: 'Номер дома',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  house: string;

  @ApiPropertyOptional({
    example: '13',
    description: 'Номер квартиры',
  })
  @Column({
    type: DataType.STRING,
  })
  flat: string;

  @ApiPropertyOptional({
    example: '9',
    description: 'Этаж',
  })
  @Column({
    type: DataType.STRING,
  })
  floor: string;

  @ApiPropertyOptional({
    example: '9311',
    description: 'Код домофона',
  })
  @Column({
    type: DataType.STRING,
  })
  intercom: string;

  @ApiProperty({
    description: 'Уникальный идентификатор города',
  })
  @ForeignKey(() => City)
  @Column({ allowNull: false })
  cityId: number;

  @ApiProperty({
    description: 'Город',
  })
  @BelongsTo(() => City)
  city: City;
}
