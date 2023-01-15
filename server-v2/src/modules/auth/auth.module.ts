import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users';
import { TokenModule } from './modules';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({}),
    // JwtModule.registerAsync({
    //   imports: [ConfigService],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get('jwtSecret'),
    //   }),
    // }),
    ConfigModule,
    forwardRef(() => UsersModule),
    TokenModule,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
