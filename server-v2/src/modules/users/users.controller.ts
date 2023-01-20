import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { AddRoleDto, CreateUserDto } from './dto';
import { User } from './users.model';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { SessionUser } from '@/decorators';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { UsersMapper } from '@/modules/users/users.mapper';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({
    summary: 'Регистрация нового пользователя',
  })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @Body() userDto: CreateUserDto,
    @UploadedFile() avatar,
    @SessionUser() user,
  ) {
    console.log('user', user);

    const updatedUser = await this.userService.updateUser(
      user.id,
      userDto,
      avatar,
    );

    return UsersMapper.toResponseDto(updatedUser);
  }

  @ApiOperation({
    summary: 'Получения списка всех пользователей',
  })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/all')
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({
    summary: 'Назначение роли пользователю',
  })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }
}
