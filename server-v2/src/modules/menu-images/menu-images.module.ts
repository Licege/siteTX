import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { MenuImagesService } from './menu-images.service';
import { MenuImagesMapper } from './menu-images.mapper';
import { MenuImagesController } from './menu-images.controller';
import { Restaurant } from '@/modules/restaurants/restaurants.model';
import { MenuImages } from './menu-images.model';
import { FilesModule } from '../files';

@Module({
  providers: [MenuImagesService, MenuImagesMapper],
  controllers: [MenuImagesController],
  imports: [
    SequelizeModule.forFeature([MenuImages, Restaurant]),
    ConfigModule,
    FilesModule,
  ],
  exports: [MenuImagesService],
})
export class MenuImagesModule {}
