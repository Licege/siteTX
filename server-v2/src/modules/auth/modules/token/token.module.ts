import { CacheModule, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Token } from './token.model';
import { UsersModule } from '../../../users';

@Module({
  providers: [TokenService],
  imports: [
    ConfigModule,
    CacheModule.register(),
    UsersModule,
    SequelizeModule.forFeature([Token]),
    JwtModule.register({}),
  ],
  exports: [TokenService, JwtModule],
})
export class TokenModule {}
