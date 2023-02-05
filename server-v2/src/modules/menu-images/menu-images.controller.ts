import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SaveMenuDto } from './dto';
import { MenuImagesService } from './menu-images.service';
import { MenuImagesType } from './menu-images.types';

@Controller('menu-images')
export class MenuImagesController {
  constructor(private readonly menuImagesService: MenuImagesService) {}

  @ApiOperation({
    summary: 'Сохранение меню',
  })
  @Post()
  saveMenu(@Body() menuDto: SaveMenuDto) {
    return this.menuImagesService.saveMenu(menuDto);
  }

  @ApiOperation({
    summary: 'Получение меню',
  })
  @Get(':type/restaurant/:restaurantId')
  getMenu(
    @Param('type') type: MenuImagesType,
    @Param('restaurantId') restaurantId: number,
  ) {
    return this.menuImagesService.getMenu({ type, restaurantId });
  }
}
