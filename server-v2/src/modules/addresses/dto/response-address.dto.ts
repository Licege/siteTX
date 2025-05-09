export class ResponseAddressDto {
  readonly id: number;
  readonly city: string;
  readonly street: string;
  readonly house: string;
  readonly flat?: string;
  readonly floor?: string;
  readonly intercom?: string;
}
