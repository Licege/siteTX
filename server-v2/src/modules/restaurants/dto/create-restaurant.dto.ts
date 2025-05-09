export class CreateRestaurantDto {
  readonly name: string;
  readonly addressId: number;
  readonly openHours: string[];
  readonly phone: string;
  readonly isMain?: boolean;
  readonly inst?: string;
  readonly vk?: string;
  readonly fb?: string;
  readonly tg?: string;
  readonly tw?: string;
}
