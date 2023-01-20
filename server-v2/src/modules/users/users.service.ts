import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles';
import { AddRoleDto, CreateUserDto } from './dto';
import { User } from './users.model';
import { FilesService } from '../files/files.service';
import { RepositoryOptions } from '../../types';
import { ActivateUser } from '../activate-users/activate-users.model';

const DEFAULT_USER_ROLE = 'USER';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(ActivateUser)
    private activateUserRepository: typeof ActivateUser,
    private rolesService: RolesService,
    private filesService: FilesService,
  ) {}

  async createUser(dto: CreateUserDto, options?: RepositoryOptions) {
    const user = await this.userRepository.create(dto, options);
    const role = await this.rolesService.getRoleByValue(DEFAULT_USER_ROLE);

    await user.$set('roles', [role.id], options);

    user.roles = [role];

    return user;
  }

  // TODO replace to UpdateUserDto
  async updateUser(
    dto: CreateUserDto,
    avatar?: any,
    { transaction }: RepositoryOptions = {},
  ) {
    let updateUserDto = { ...dto };

    if (avatar) {
      const avatarSrc = await this.filesService.createFile(avatar);
      updateUserDto = { ...updateUserDto, avatar: avatarSrc };
    }

    return this.userRepository.update(updateUserDto, {
      where: { id: 3 },
      transaction,
    });
  }

  async getUserById(id: number, { transaction }: RepositoryOptions = {}) {
    return this.userRepository.findOne({
      where: { id },
      include: { all: true },
      transaction,
    });
  }

  async getAllUsers() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string, { transaction }: RepositoryOptions = {}) {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
      transaction,
    });
  }

  async getUserByActivationLink(
    activationLink: string,
    { transaction }: RepositoryOptions = {},
  ) {
    return this.userRepository.findOne({
      include: [
        { where: { activationLink }, model: this.activateUserRepository },
        { all: true },
      ],
      transaction,
    });
  }

  async addRole(dto: AddRoleDto, options?: RepositoryOptions) {
    const user = await this.userRepository.findByPk(dto.userId, options);
    const role = await this.rolesService.getRoleByValue(dto.value, options);

    if (role && user) {
      await user.$add('role', role.id);
    }

    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }
}
