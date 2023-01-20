import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users';
import { TokenModule } from './modules';
import { ActivateUsersModule } from '../activate-users';
import { BanUsersModule } from '../ban-users';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule,
    forwardRef(() => UsersModule),
    TokenModule,
    ActivateUsersModule,
    BanUsersModule,
  ],
  exports: [],
})
export class AuthModule {}
