import * as path from 'path';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { baseConfig, databaseConfig, smtpConfig } from './configs';
import {
  AuthModule,
  BanUsersModule,
  DishesModule,
  MailModule,
  UsersModule,
  RolesModule,
  FilesModule,
  TelegramModule,
  TokenModule,
} from './modules';
import { User } from './modules/users/users.model';
import { Role } from './modules/roles/roles.model';
import { UserRoles } from './modules/roles/user-roles.model';
import { Dish } from './modules/dishes/dishes.model';
import { BanUser } from './modules/ban-users/ban-users.model';
import { TestModule } from './test/test.module';
import { Token } from './modules/auth/modules/token/token.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [baseConfig, databaseConfig, smtpConfig],
    }),
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: 5432,
    //   username: process.env.DB_USER || 'root',
    //   password: process.env.DB_PASSWORD || 'root',
    //   database: process.env.DB_NAME || 'trixolma-test',
    //   models: [Dish, User, Role, UserRoles, BanUser, Token],
    //   autoLoadModels: true,
    //   logging: console.log,
    // }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('database.dialect'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        models: [Dish, User, Role, UserRoles, BanUser, Token],
        autoLoadModels: true,
      }),
      inject: [ConfigService],
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
    BanUsersModule,
    MailModule,
    TokenModule,
  ],
})
export class AppModule {}
