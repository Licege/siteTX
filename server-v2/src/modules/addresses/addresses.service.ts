import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from '@/modules/addresses/addresses.model';
import { CreateAddressDto } from '@/modules/addresses/dto';
import { RepositoryOptions } from '@/types';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address) private addressRepository: typeof Address,
  ) {}

  async getById(
    addressId: number,
    { transaction }: RepositoryOptions = {},
  ): Promise<Address> {
    return this.addressRepository.findByPk(addressId, {
      include: { all: true },
      transaction,
    });
  }

  async create(
    dto: CreateAddressDto,
    options: RepositoryOptions = {},
  ): Promise<Address> {
    const address = await this.addressRepository.create(dto, options);

    return this.getById(address.id, options);
  }
}
