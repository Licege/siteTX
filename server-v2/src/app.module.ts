import * as path from 'path';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  baseConfig,
  databaseConfig,
  jwtConfig,
  smtpConfig,
  telegramConfig,
} from './configs';
import {
  AuthModule,
  AddressesModule,
  ActivateUsersModule,
  BanUsersModule,
  CitiesModule,
  DishesModule,
  MailModule,
  UsersModule,
  RolesModule,
  FilesModule,
  TelegramModule,
  TokenModule,
  RestaurantsModule,
  MenuImagesModule,
  FileManipulatorModule,
} from './modules';
import { User } from './modules/users/users.model';
import { Role } from './modules/roles/roles.model';
import { UserRoles } from './modules/roles/user-roles.model';
import { Dish } from './modules/dishes/dishes.model';
import { BanUser } from './modules/ban-users/ban-users.model';
import { TestModule } from './test/test.module';
import { Token } from './modules/auth/modules/token/token.model';
import { ActivateUser } from './modules/activate-users/activate-users.model';
import { Restaurant } from '@/modules/restaurants/restaurants.model';
import { City } from './modules/cities/cities.model';
import { Address } from '@/modules/addresses/addresses.model';
import { UserAddresses } from '@/modules/users/user-addresses.model';
import { MenuImages } from '@/modules/menu-images/menu-images.model';
import { File } from '@/modules/files/file.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [baseConfig, databaseConfig, jwtConfig, smtpConfig, telegramConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('database.dialect'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        models: [
          Address,
          Dish,
          User,
          Role,
          UserAddresses,
          UserRoles,
          BanUser,
          Token,
          ActivateUser,
          Restaurant,
          City,
          MenuImages,
          File,
        ],
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
    // TelegramModule,
    // TestModule,
    BanUsersModule,
    MailModule,
    TokenModule,
    ActivateUsersModule,
    RestaurantsModule,
    CitiesModule,
    AddressesModule,
    MenuImagesModule,
    FileManipulatorModule,
  ],
})
export class AppModule {}
