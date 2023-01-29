import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { TransactionInterceptor } from '@/interceptors';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionParam } from '@/decorators';
import { AddressesService } from '@/modules/addresses/addresses.service';
import { AddressesMapper } from '@/modules/addresses/addresses.mapper';
import { CreateAddressDto } from '@/modules/addresses/dto';

@Controller('addresses')
export class AddressesController {
  constructor(private addressService: AddressesService) {}

  // TODO Сделать доступным только админу
  @UseInterceptors(TransactionInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() dto: CreateAddressDto,
    @TransactionParam() transaction: Transaction,
  ) {
    const address = await this.addressService.create(dto, { transaction });
    return AddressesMapper.toResponseDto(address);
  }
}
