import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './interfaces/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const passwordHashed = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: passwordHashed,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUserById(idUser: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: idUser });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { ...user, password: undefined };
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({
      select: ['id', 'name', 'email', 'typeUser'],
    });
  }
}
