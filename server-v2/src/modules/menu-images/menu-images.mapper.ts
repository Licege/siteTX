import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MenuImages } from './menu-images.model';
import { ResponseMenuDto } from './dto';
import { File } from '../files/file.model';

@Injectable()
export class MenuImagesMapper {
  constructor(private configService: ConfigService) {}

  toResponseDto(menu: MenuImages, files: File[]): ResponseMenuDto {
    return {
      id: menu.id,
      type: menu.type,
      restaurantId: menu.restaurantId,
      images: files.map((file) => ({
        name: `${this.configService.get('storage.url')}/${file.name}`,
        preview: `${this.configService.get('storage.url')}/${file.preview}`,
        originalName: file.originalName,
      })),
    };
  }
}
