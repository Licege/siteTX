import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BanUser } from './ban-users.model';
import { UsersService } from '../users/users.service';
import { BanUserDto } from './dto';
import { DateEntity } from '../../domains/entities';

@Injectable()
export class BanUsersService {
  constructor(
    @InjectModel(BanUser) private banUserRepository: typeof BanUser,
    private usersService: UsersService,
  ) {}

  async ban(dto: BanUserDto): Promise<BanUser> {
    const user = await this.usersService.getUserById(dto.userId);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const ban = await this.banUserRepository.findOne({
      where: { userId: dto.userId },
    });

    // TODO произвести логаут заблокированного пользователя

    if (ban) {
      const [, [updatedBan]] = await this.banUserRepository.update(dto, {
        where: { userId: dto.userId },
        returning: true,
      });

      return updatedBan;
    }

    return this.banUserRepository.create(dto);
  }

  async isUserBanned(userId) {
    const banRecord = await this.banUserRepository.findOne({
      where: { userId },
    });

    if (!banRecord) {
      return false;
    }

    if (!banRecord.dateOfExpiration) {
      return false;
    }

    return !DateEntity.isPast(banRecord.dateOfExpiration);
  }
}
