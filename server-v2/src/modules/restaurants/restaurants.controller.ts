import { TransactionInterceptor } from '@/interceptors';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from '@/modules/restaurants/dto';
import { TransactionParam } from '@/decorators';
import { RestaurantsMapper } from '@/modules/restaurants/restaurants.mapper';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransactionInterceptor)
  async create(
    @Body() dto: CreateRestaurantDto,
    @TransactionParam() transaction: Transaction,
  ) {
    const restaurant = await this.restaurantService.create(dto, {
      transaction,
    });
    return RestaurantsMapper.toResponseDto(restaurant);
  }

  @Get()
  async getMainRestaurant() {
    const restaurant = await this.restaurantService.getMainRestaurant();

    return RestaurantsMapper.toResponseDto(restaurant);
  }
}
