import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './cities.model';
import { FindOptions, RepositoryOptions } from '@/types';
import { CreateCityDto } from '@/modules/cities/dto/create-city.dto';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City) private cityRepository: typeof City) {}

  async getAll({
    limit,
    offset,
    order,
    transaction,
  }: FindOptions = {}): Promise<City[]> {
    return this.cityRepository.findAll({
      limit,
      offset,
      order,
      transaction,
    });
  }

  async create(
    dto: CreateCityDto,
    options: RepositoryOptions = {},
  ): Promise<City> {
    return this.cityRepository.create(dto, options);
  }

  async destroyById(
    cityId: number,
    { transaction }: RepositoryOptions = {},
  ): Promise<number> {
    await this.cityRepository.destroy({ where: { id: cityId }, transaction });

    return cityId;
  }
}
