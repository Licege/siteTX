import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MenuImages } from './menu-images.model';
import { FilesService } from '../files/files.service';
import { ResponseMenuDto, SaveMenuDto } from './dto';
import { MenuImagesType } from './menu-images.types';
import { MenuImagesMapper } from './menu-images.mapper';

@Injectable()
export class MenuImagesService {
  constructor(
    @InjectModel(MenuImages) private menuImagesRepository: typeof MenuImages,
    private filesService: FilesService,
  ) {}

  async saveMenu(dto: SaveMenuDto): Promise<MenuImages> {
    const previousMenu = await this.menuImagesRepository.findOne({
      where: { restaurantId: dto.restaurantId, type: dto.type },
    });

    if (!previousMenu) {
      const menu = await this.menuImagesRepository.create(dto);

      return menu;
    }

    const [, [updatedMenu]] = await this.menuImagesRepository.update(dto, {
      where: { id: previousMenu.id },
      returning: true,
    });

    return updatedMenu;
  }

  async getMenu({
    type,
    restaurantId,
  }: {
    type: MenuImagesType;
    restaurantId: number;
  }): Promise<ResponseMenuDto> {
    const menu = await this.menuImagesRepository.findOne({
      where: { type, restaurantId },
    });

    const images = await this.filesService.getFilesRecords(menu.images);

    return MenuImagesMapper.toResponseDto(menu, images);
  }
}
