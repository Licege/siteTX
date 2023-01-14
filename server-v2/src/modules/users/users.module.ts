import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { RolesModule } from '../roles';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { AuthModule } from '../auth';
import { FilesModule } from '../files';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
