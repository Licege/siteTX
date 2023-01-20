import {
  Body,
  Request,
  Response,
  Param,
  Post,
  Get,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto';
import { LoginDto } from './dto';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';

const ONE_DAY = 24 * 60 * 60 * 1000;

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

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * ONE_DAY,
      httpOnly: true,
      secure: isProduction,
    });

    return res.send({ accessToken, refreshToken });
  }

  // TODO сделать приватным
  @Post('/logout')
  async logout(@Request() req, @Response() res) {
    const { refreshToken } = req.cookies;
    await this.authService.logout(refreshToken);

    res.clearCookie('refreshToken');

    return res.sendStatus(HttpStatus.OK);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
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

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * ONE_DAY,
      httpOnly: true,
      secure: isProduction,
    });

    return res.send({ accessToken, refreshToken });
  }
}
