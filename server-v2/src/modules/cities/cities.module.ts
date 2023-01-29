import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { City } from './cities.model';
import { SEQUELIZE } from '@/interceptors';

@Module({
  providers: [CitiesService, { provide: SEQUELIZE, useExisting: Sequelize }],
  controllers: [CitiesController],
  imports: [SequelizeModule.forFeature([City]), ConfigModule, JwtModule],
})
export class CitiesModule {}
