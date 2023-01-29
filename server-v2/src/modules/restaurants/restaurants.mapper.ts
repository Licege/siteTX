import { Restaurant } from '@/modules/restaurants/restaurants.model';
import { ResponseRestaurantDto } from '@/modules/restaurants/dto';

export class RestaurantsMapper {
  static toResponseDto(model: Restaurant): ResponseRestaurantDto {
    return {
      id: model.id,
      name: model.name,
      phone: model.phone,
      address: {
        city: model.address.city.name,
        street: model.address.street,
        house: model.address.house,
      },
      openHours: model.openHours,
      socialNetworks: {
        inst: model.inst,
        vk: model.vk,
        tg: model.tg,
        tw: model.tw,
        fb: model.fb,
      },
    };
  }
}
