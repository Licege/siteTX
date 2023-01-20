import { Module } from '@nestjs/common';
import { BanUsersController } from './ban-users.controller';
import { BanUsersService } from './ban-users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BanUser } from './ban-users.model';
import { User } from '../users/users.model';
import { UsersModule } from '../users';

@Module({
  controllers: [BanUsersController],
  providers: [BanUsersService],
  imports: [SequelizeModule.forFeature([User, BanUser]), UsersModule],
  exports: [BanUsersService],
})
export class BanUsersModule {}
