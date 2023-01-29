import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { Address } from '@/modules/addresses/addresses.model';
import { SEQUELIZE } from '@/interceptors';

@Module({
  providers: [AddressesService, { provide: SEQUELIZE, useExisting: Sequelize }],
  controllers: [AddressesController],
  imports: [SequelizeModule.forFeature([Address]), JwtModule, ConfigModule],
  exports: [AddressesService],
})
export class AddressesModule {}
