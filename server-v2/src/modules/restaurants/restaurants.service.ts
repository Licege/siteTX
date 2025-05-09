import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Restaurant } from '@/modules/restaurants/restaurants.model';
import { CreateRestaurantDto } from '@/modules/restaurants/dto';
import { FindOptions, RepositoryOptions } from '@/types';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant) private restaurantRepository: typeof Restaurant,
  ) {}

  async get(restOptions: FindOptions = {}): Promise<Restaurant> {
    return this.restaurantRepository.findOne({
      include: { all: true, nested: true },
      ...restOptions,
    });
  }

  async getById(
    restaurantId: number,
    { transaction }: RepositoryOptions = {},
  ): Promise<Restaurant> {
    return this.restaurantRepository.findByPk(restaurantId, {
      include: { all: true, nested: true },
      transaction,
    });
  }

  async create(
    dto: CreateRestaurantDto,
    options: RepositoryOptions = {},
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.create(dto, options);

    return this.getById(restaurant.id, options);
  }

  async getMainRestaurant({
    transaction,
  }: RepositoryOptions = {}): Promise<Restaurant> {
    return this.get({ where: { isMain: true }, transaction });
  }
}
