import { Controller, Post, Body, Get } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Dish } from './dishes.model';

@ApiTags('Блюда')
@Controller('api/v1/dishes')
export class DishesController {
  constructor(private dishService: DishesService) {}

  @ApiOperation({
    summary: 'Создание нового блюда',
  })
  @ApiResponse({
    status: 200,
    type: Dish,
  })
  @Post()
  create(@Body() dishDto: CreateDishDto) {
    return this.dishService.createDish(dishDto);
  }

  @ApiOperation({
    summary: 'Получение всех пользователей',
  })
  @ApiResponse({
    status: 200,
    type: [Dish],
  })
  @Get('/all')
  getAll() {
    return this.dishService.getAllDishes();
  }
}
