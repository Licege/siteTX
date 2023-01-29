import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Restaurant } from '@/modules/restaurants/restaurants.model';
import { Address } from '@/modules/addresses/addresses.model';
import { AddressesModule } from '@/modules';
import { SEQUELIZE } from '@/interceptors';

@Module({
  providers: [
    RestaurantsService,
    { provide: SEQUELIZE, useExisting: Sequelize },
  ],
  controllers: [RestaurantsController],
  imports: [
    SequelizeModule.forFeature([Restaurant, Address]),
    AddressesModule,
    JwtModule,
    ConfigModule,
  ],
})
export class RestaurantsModule {}
