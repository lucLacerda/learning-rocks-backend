import { IsEnum, IsString } from 'class-validator';
import { USER_TYPE_ENUM } from '../enum/user-type.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsEnum(USER_TYPE_ENUM, { message: 'typeUser must be a valid enum value' })
  typeUser: USER_TYPE_ENUM;

  @IsString()
  password: string;
}
