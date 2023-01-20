import {
  Body,
  Request,
  Response,
  Param,
  Post,
  Get,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Transaction } from 'sequelize';
import { CreateUserDto } from '../users/dto';
import { LoginDto } from './dto';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TransactionInterceptor } from '@/interceptors';
import { TransactionParam } from '@/decorators';
import { DateEntity } from '@/domains/entities';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('/login')
  async login(@Body() dto: LoginDto, @Request() req, @Response() res) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    const isProduction = this.configService.get('environment') === 'production';
    const refreshExpiresIn = this.configService.get('jwt.refreshExpiresIn');
    const maxAgeRefreshToken = DateEntity.getTime(refreshExpiresIn);

    res.cookie('refreshToken', refreshToken, {
      maxAge: maxAgeRefreshToken,
      httpOnly: true,
      secure: isProduction,
    });

    return res.send({ accessToken, refreshToken });
  }

  @Post('/logout')
  async logout(@Request() req, @Response() res) {
    const { refreshToken } = req.cookies;
    await this.authService.logout(refreshToken);

    res.clearCookie('refreshToken');

    return res.sendStatus(HttpStatus.OK);
  }

  @Post('/registration')
  @UseInterceptors(TransactionInterceptor)
  registration(
    @Body() userDto: CreateUserDto,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.authService.registration(userDto, { transaction });
  }

  @Get('/activate/:link')
  async activateAccount(
    @Param('link') activationLink: string,
    @Response() res,
  ) {
    const clientUrl = this.configService.get('clientUrl');

    await this.authService.activateAccount(activationLink);

    return res.redirect(clientUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/refresh')
  async refresh(@Request() req, @Response() res) {
    const oldRefreshToken = req.cookies.refreshToken;

    const { accessToken, refreshToken } = await this.authService.refresh(
      oldRefreshToken,
    );

    const isProduction = this.configService.get('environment') === 'production';
    const refreshExpiresIn = this.configService.get('jwt.refreshExpiresIn');
    const maxAgeRefreshToken = DateEntity.getTime(refreshExpiresIn);

    res.cookie('refreshToken', refreshToken, {
      maxAge: maxAgeRefreshToken,
      httpOnly: true,
      secure: isProduction,
    });

    return res.send({ accessToken, refreshToken });
  }
}
