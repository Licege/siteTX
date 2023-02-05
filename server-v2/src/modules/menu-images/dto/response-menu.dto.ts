import { MenuImagesType } from '@/modules/menu-images/menu-images.types';

interface Image {
  name: string;
  originalName: string;
  preview: string;
}

export class ResponseMenuDto {
  readonly id: number;
  readonly type: MenuImagesType;
  readonly images: Image[];
  readonly restaurantId: number;
}
