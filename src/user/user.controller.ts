import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { USER_TYPE_ENUM } from './enum/user-type.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Query('idUser') idUser: number) {
    if (idUser) {
      return this.userService.getUserById(idUser);
    }
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() createUser: CreateUserDto, @Req() req: Request) {
    if (req['user']?.role !== 'admin') {
      throw new ForbiddenException(
        'Only admins are allowed to perform this action',
      );
    }
    return this.userService.createUser(createUser);
  }
}
