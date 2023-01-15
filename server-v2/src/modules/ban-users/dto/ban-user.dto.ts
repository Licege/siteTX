export class BanUserDto {
  readonly userId: number;
  readonly reason: string;
  readonly dateOfExpiration: Date;
}
