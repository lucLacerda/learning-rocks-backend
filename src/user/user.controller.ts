import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiSecurity('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({ name: 'idUser', required: false })
  async getUser(@Query('idUser') idUser?: number) {
    if (idUser) {
      return this.userService.getUserById(idUser);
    }
    return this.userService.getAllUsers();
  }

  @Post()
  @ApiBody({
    type: CreateUserDto,
    examples: {
      default: {
        value: {
          name: 'John Doe',
          email: 'john@example.com',
          typeUser: 1,
          password: 'strongPassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    type: CreateUserDto,
  })
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }
}
