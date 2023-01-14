import * as path from 'path';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  AuthModule,
  DishesModule,
  UsersModule,
  RolesModule,
  FilesModule,
  TelegramModule,
} from './modules';
import { User } from './modules/users/users.model';
import { Role } from './modules/roles/roles.model';
import { UserRoles } from './modules/roles/user-roles.model';
import { Dish } from './modules/dishes/dishes.model';
import { TestModule } from './test/test.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_USER || 'root',
      database: process.env.DB_NAME || 'trixolma-test',
      models: [Dish, User, Role, UserRoles],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    DishesModule,
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    TelegramModule,
    TestModule,
  ],
})
export class AppModule {}
