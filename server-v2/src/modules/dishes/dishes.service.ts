import { Injectable } from '@nestjs/common';
import { Dish } from './dishes.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDishDto } from './dto';

@Injectable()
export class DishesService {
  constructor(@InjectModel(Dish) private dishRepository: typeof Dish) {}

  async createDish(dto: CreateDishDto) {
    const dish = await this.dishRepository.create(dto);
    return dish;
  }

  async getAllDishes() {
    const dishes = await this.dishRepository.findAll();
    return dishes;
  }
}
