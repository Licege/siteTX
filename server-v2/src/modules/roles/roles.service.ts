import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { RepositoryOptions } from '../../types';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto, options?: RepositoryOptions) {
    const role = await this.roleRepository.create(dto, options);

    return role;
  }

  async getRoleByValue(value: string, { transaction }: RepositoryOptions = {}) {
    const role = await this.roleRepository.findOne({
      where: { value },
      transaction,
    });

    return role;
  }
}
