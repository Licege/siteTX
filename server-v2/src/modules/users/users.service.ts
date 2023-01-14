import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles';
import { AddRoleDto, CreateUserDto } from './dto';
import { User } from './users.model';
import { FilesService } from '../files/files.service';

const DEFAULT_USER_ROLE = 'USER';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
    private filesService: FilesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue(DEFAULT_USER_ROLE);

    await user.$set('roles', [role.id]);

    user.roles = [role];

    return user;
  }

  // TODO replace to UpdateUserDto
  async updateUser(dto: CreateUserDto, avatar?: any) {
    let updateUserDto = { ...dto };

    if (avatar) {
      const avatarSrc = await this.filesService.createFile(avatar);
      updateUserDto = { ...updateUserDto, avatar: avatarSrc };
    }

    const user = await this.userRepository.update(updateUserDto, {
      where: { id: 3 },
    });

    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });

    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.id);
    }

    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }
}
