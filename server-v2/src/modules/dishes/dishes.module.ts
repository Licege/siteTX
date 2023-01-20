import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { Dish } from './dishes.model';

@Module({
  controllers: [DishesController],
  providers: [DishesService],
  imports: [SequelizeModule.forFeature([Dish])],
})
export class DishesModule {}
