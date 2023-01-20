import { User } from './users.model';
import { ResponseUserDto } from '@/modules/users/dto';

export class UsersMapper {
  static toResponseDto(model: User): ResponseUserDto {
    return {
      id: model.id,
      email: model.email,
      lastName: model.lastName,
      firstName: model.firstName,
      patronymic: model.patronymic,
      avatar: model.avatar,
      dateOfBirthday: model.dateOfBirthday,
      phone: model.phone,
    };
  }
}
