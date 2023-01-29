export class CreateAddressDto {
  readonly cityId: number;
  readonly street: string;
  readonly house: string;
  readonly flat?: string;
  readonly floor?: string;
  readonly intercom?: string;
}
