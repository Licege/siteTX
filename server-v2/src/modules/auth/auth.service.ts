import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';
import { LoginDto } from './dto';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { TokenService } from './modules/token/token.service';

const SALT = 5;

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async login(dto: LoginDto, ip: string) {
    const user = await this.validateUser(dto);

    const tokens = await this.generateToken(user);
    await this.saveToken(user.id, ip, tokens.refreshToken);

    return tokens;
  }

  async logout(refreshToken: string) {
    await this.tokenService.removeToken(refreshToken);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь уже зарегистрирован',
        HttpStatus.BAD_REQUEST,
      );
    }

    const activationLink = uuid.v4();
    const hashedPassword = await bcrypt.hash(userDto.password, SALT);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
      // activationLink,
    });
    const tokens = await this.generateToken(user);
    await this.saveToken(user.id, 'ip', tokens.refreshToken);

    return tokens;
  }

  // TODO move to TokenService
  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    const accessSecret = this.configService.get('jwtAccessSecret');
    const refreshSecret = this.configService.get('jwtRefreshSecret');

    const accessExpiresIn = this.configService.get('jwtAccessExpiresIn');
    const refreshExpiresIn = this.configService.get('jwtRefreshExpiresIn');

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

  private async saveToken(userId, clientIp, refreshToken) {
    const tokenRecord = await this.tokenService.getToken(userId, clientIp);

    if (tokenRecord) {
      tokenRecord.refreshToken = refreshToken;
      await tokenRecord.save();
    }

    return this.tokenService.createToken({
      userId,
      clientIp,
      refreshToken,
    });
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user?.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }

  async activateAccount(activationLink) {
    const user = await this.userService.getUserByActivationLink(activationLink);

    if (!user) {
      throw new HttpException('Некорректная ссылка', HttpStatus.BAD_REQUEST);
    }

    user.activationLink = '';
    user.isActivated = true;
    await user.save();
  }

  async refresh(oldRefreshToken: string) {
    if (!oldRefreshToken) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userData = this.validateRefreshToken(oldRefreshToken);
    const tokenFromDb = await this.tokenService.getTokenByRefresh(
      oldRefreshToken,
    );

    if (!userData || !tokenFromDb) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.userService.getUserById(userData.userId);
    const tokens = await this.generateToken(user);
    await this.saveToken(user.id, tokenFromDb.clientIp, tokens.refreshToken);

    return tokens;
  }

  // TODO move to TokenService
  private validateAccessToken(token) {
    try {
      const secret = this.configService.get('jwtAccessSecret');

      return this.jwtService.verify(token, { secret });
    } catch (e) {
      return null;
    }
  }

  // TODO move to TokenService
  private validateRefreshToken(token) {
    try {
      const secret = this.configService.get('jwtRefreshSecret');

      return this.jwtService.verify(token, { secret });
    } catch (e) {
      return null;
    }
  }
}
