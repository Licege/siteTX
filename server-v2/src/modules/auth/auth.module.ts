import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users';
import { TokenModule } from './modules';
import { ActivateUsersModule, BanUsersModule } from '@/modules';
import { SEQUELIZE, TransactionInterceptor } from '@/interceptors';
import { Sequelize } from 'sequelize-typescript';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    TransactionInterceptor,
    { provide: SEQUELIZE, useExisting: Sequelize },
  ],
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
