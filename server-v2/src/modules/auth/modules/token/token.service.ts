import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import { CreateTokenDto } from './dto';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token) private tokenRepository: typeof Token) {}

  async removeToken(refreshToken: string) {
    await this.tokenRepository.destroy({ where: { refreshToken } });
  }

  async getToken(userId: number, clientIp: string) {
    return this.tokenRepository.findOne({ where: { userId, clientIp } });
  }

  async getTokenByRefresh(refreshToken: string) {
    return this.tokenRepository.findOne({ where: { refreshToken } });
  }

  async createToken(dto: CreateTokenDto) {
    return this.tokenRepository.create(dto);
  }
}
