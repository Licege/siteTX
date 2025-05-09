import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Transaction } from 'sequelize';
import { CitiesService } from '@/modules/cities/cities.service';
import { CreateCityDto } from '@/modules/cities/dto/create-city.dto';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { TransactionInterceptor } from '@/interceptors';
import { TransactionParam } from '@/decorators';

@ApiTags('Города')
@Controller('cities')
export class CitiesController {
  constructor(private cityService: CitiesService) {}

  @ApiOperation({
    summary: 'Получение списка городов',
  })
  @UseInterceptors(TransactionInterceptor)
  @Get('/all')
  getAll(@TransactionParam() transaction: Transaction) {
    return this.cityService.getAll({ transaction });
  }

  @ApiOperation({
    summary: 'Создание нового города',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransactionInterceptor)
  @Post()
  create(
    @Body() cityDto: CreateCityDto,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.cityService.create(cityDto, { transaction });
  }

  @ApiOperation({
    summary: 'Удаление города',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransactionInterceptor)
  @Delete(':cityId')
  destroy(
    @Param('cityId') cityId: number,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.cityService.destroyById(cityId, { transaction });
  }
}
