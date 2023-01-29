interface Address {
  city: string;
  street: string;
  house: string;
  flat?: string;
  floor?: string;
}

interface SocialNetworks {
  readonly inst?: string;
  readonly vk?: string;
  readonly fb?: string;
  readonly tw?: string;
  readonly tg?: string;
}

export class ResponseRestaurantDto {
  readonly id: number;
  readonly name: string;
  readonly phone: string;
  readonly openHours: string[];
  readonly address: Address;
  readonly socialNetworks: SocialNetworks;
}
