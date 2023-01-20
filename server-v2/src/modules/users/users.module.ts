import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { RolesModule } from '../roles';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { AuthModule } from '../auth';
import { FilesModule } from '../files';
import { ActivateUser } from '../activate-users/activate-users.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ConfigModule,
    JwtModule,
    SequelizeModule.forFeature([User, Role, UserRoles, ActivateUser]),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
