import { Module } from '@nestjs/common';
import { MenuImagesService } from './menu-images.service';
import { MenuImagesController } from './menu-images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Restaurant } from '@/modules/restaurants/restaurants.model';
import { MenuImages } from './menu-images.model';
import { FilesModule } from '../files';

@Module({
  providers: [MenuImagesService],
  controllers: [MenuImagesController],
  imports: [SequelizeModule.forFeature([MenuImages, Restaurant]), FilesModule],
  exports: [MenuImagesService],
})
export class MenuImagesModule {}
