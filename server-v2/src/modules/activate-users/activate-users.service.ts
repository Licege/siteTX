import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivateUser } from './activate-users.model';
import { CreateActivateUserDto } from './dto';
import { RepositoryOptions } from '../../types';

@Injectable()
export class ActivateUsersService {
  constructor(
    @InjectModel(ActivateUser)
    private activateUserRepository: typeof ActivateUser,
  ) {}

  async create(dto: CreateActivateUserDto, options: RepositoryOptions = {}) {
    return this.activateUserRepository.create(dto, options);
  }

  async activateUser(userId: number, { transaction }: RepositoryOptions = {}) {
    const [countUpdated, updated] = await this.activateUserRepository.update(
      { activationLink: '', isActivated: true },
      { where: { userId }, returning: true, transaction },
    );

    if (!countUpdated) return undefined;

    return updated[0];
  }

  async isUserActivated(userId, { transaction }: RepositoryOptions = {}) {
    const activationRecord = await this.activateUserRepository.findOne({
      where: { userId },
      transaction,
    });

    if (!activationRecord) {
      return false;
    }

    return activationRecord.isActivated;
  }
}
