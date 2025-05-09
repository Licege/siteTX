import { MenuImagesType } from '../menu-images.types';

export class SaveMenuDto {
  readonly type: MenuImagesType;
  readonly images: number[];
  readonly restaurantId: number;
}
