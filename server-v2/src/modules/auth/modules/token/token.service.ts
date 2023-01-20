import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Token } from './token.model';
import { CreateTokenDto } from './dto';
import { UsersService } from '../../../users/users.service';
import { RepositoryOptions } from '../../../../types';
import { User } from '../../../users/users.model';
import { DateEntity } from '../../../../domains/entities';

@Injectable()
export class TokenService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(Token) private tokenRepository: typeof Token,
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async removeToken(refreshToken: string) {
    const user = this.validateRefreshToken(refreshToken);

    if (!user) return;

    await this.cacheManager.del(user.id.toString());
  }

  async removeTokenByUserId(userId: number) {
    await this.cacheManager.del(userId.toString());
  }

  async createToken(dto: CreateTokenDto, options?: RepositoryOptions) {
    return this.tokenRepository.create(dto, options);
  }

  async refresh(oldRefreshToken: string) {
    if (!oldRefreshToken) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userData = this.validateRefreshToken(oldRefreshToken);

    const savedRefreshToken = await this.cacheManager.get(
      userData?.id?.toString(),
    );

    if (
      !userData ||
      !savedRefreshToken ||
      savedRefreshToken !== oldRefreshToken
    ) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.userService.getUserById(userData.id);
    const tokens = await this.generateToken(user);
    await this.saveToken(tokens.refreshToken);

    return tokens;
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    const accessSecret = this.configService.get('jwt.accessSecret');
    const refreshSecret = this.configService.get('jwt.refreshSecret');

    const accessExpiresIn = this.configService.get('jwt.accessExpiresIn');
    const refreshExpiresIn = this.configService.get('jwt.refreshExpiresIn');

    const accessToken = this.jwtService.sign(payload, {
      secret: accessSecret,
      expiresIn: accessExpiresIn,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(refreshToken) {
    const expiresIn = this.configService.get('jwt.refreshExpiresIn');

    const ttl = Date.now() + DateEntity.getTime(expiresIn);

    const user = this.validateRefreshToken(refreshToken);

    await this.cacheManager.set(user.id.toString(), refreshToken, ttl);
  }

  private validateAccessToken(token) {
    try {
      const secret = this.configService.get('jwt.accessSecret');

      return this.jwtService.verify(token, { secret });
    } catch (e) {
      return null;
    }
  }

  private validateRefreshToken(token) {
    try {
      const secret = this.configService.get('jwt.refreshSecret');

      return this.jwtService.verify(token, { secret });
    } catch (e) {
      return null;
    }
  }
}
