import { MenuImages } from './menu-images.model';
import { ResponseMenuDto } from './dto';
import { File } from '../files/file.model';

export class MenuImagesMapper {
  static toResponseDto(menu: MenuImages, files: File[]): ResponseMenuDto {
    return {
      id: menu.id,
      type: menu.type,
      restaurantId: menu.restaurantId,
      images: files.map((file) => ({
        name: `http://pub.trixolma.localhost:5000/api/v1/files/${file.name}`,
        preview: `http://pub.trixolma.localhost:5000/api/v1/files/${file.preview}`,
        originalName: file.originalName,
      })),
    };
  }
}
