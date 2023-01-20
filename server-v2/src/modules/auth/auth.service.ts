import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';
import { LoginDto } from './dto';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { TokenService } from './modules/token/token.service';
import { ActivateUsersService } from '../activate-users/activate-users.service';
import { RepositoryOptions } from '../../types';
import { DateEntity } from '../../domains/entities';
import { BanUsersService } from '../ban-users/ban-users.service';

const SALT = 5;

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
    private tokenService: TokenService,
    private activateUsersService: ActivateUsersService,
    private banUsersService: BanUsersService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    const isUserActivated = await this.activateUsersService.isUserActivated(
      user.id,
    );
    if (!isUserActivated) {
      throw new UnauthorizedException({
        message: 'Аккаунт не активирован',
      });
    }

    const isUserBanned = await this.banUsersService.isUserBanned(user.id);
    if (isUserBanned) {
      throw new ForbiddenException({
        message: 'Аккаунт заблокирован',
      });
    }

    const tokens = await this.tokenService.generateToken(user);
    await this.tokenService.saveToken(tokens.refreshToken);

    return tokens;
  }

  async logout(refreshToken: string) {
    await this.tokenService.removeToken(refreshToken);
  }

  async registration(userDto: CreateUserDto, options?: RepositoryOptions) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь уже зарегистрирован',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(userDto.password, SALT);
    const user = await this.userService.createUser(
      {
        ...userDto,
        password: hashedPassword,
      },
      options,
    );

    const activationLink = uuid.v4();
    await this.activateUsersService.create(
      { userId: user.id, activationLink, isActivated: false },
      options,
    );

    const tokens = await this.tokenService.generateToken(user);
    await this.tokenService.saveToken(tokens.refreshToken);

    return tokens;
  }

  async refresh(oldRefreshToken: string) {
    return this.tokenService.refresh(oldRefreshToken);
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

  async activateAccount(activationLink, options?: RepositoryOptions) {
    const user = await this.userService.getUserByActivationLink(
      activationLink,
      options,
    );

    if (!user) {
      throw new HttpException('Некорректная ссылка', HttpStatus.BAD_REQUEST);
    }

    await this.activateUsersService.activateUser(user.id, options);
  }
}
