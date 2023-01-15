export class CreateTokenDto {
  readonly userId: number;
  readonly clientIp: string;
  readonly refreshToken: string;
}
