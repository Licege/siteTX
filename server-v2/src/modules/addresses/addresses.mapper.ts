import { ResponseAddressDto } from '@/modules/addresses/dto';
import { Address } from '@/modules/addresses/addresses.model';

export class AddressesMapper {
  static toResponseDto(model: Address): ResponseAddressDto {
    console.log('model', model);
    return {
      id: model.id,
      city: model.city.name,
      street: model.street,
      house: model.house,
      flat: model.flat,
      floor: model.floor,
      intercom: model.intercom,
    };
  }
}
