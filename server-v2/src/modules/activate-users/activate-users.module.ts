import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActivateUsersController } from './activate-users.controller';
import { ActivateUsersService } from './activate-users.service';
import { ActivateUser } from './activate-users.model';

@Module({
  controllers: [ActivateUsersController],
  providers: [ActivateUsersService],
  imports: [SequelizeModule.forFeature([ActivateUser])],
  exports: [ActivateUsersService],
})
export class ActivateUsersModule {}
