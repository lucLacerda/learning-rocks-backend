import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER_TYPE_ENUM } from './enum/user-type.enum';
import { UserEntity } from './interfaces/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockRepository: Partial<Repository<UserEntity>>;

  beforeEach(async () => {
    mockRepository = {
      findOneBy: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        userType: 'USER',
        password: 'hashed',
      }),
      find: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          userType: 'USER',
        },
      ]),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest
        .fn()
        .mockImplementation((user) =>
          Promise.resolve({ ...user, id: Date.now() }),
        ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const newUser = await service.createUser({
      name: 'New User',
      email: 'new@example.com',
      typeUser: USER_TYPE_ENUM.USER,
      password: 'securePassword',
    });
    expect(newUser).toMatchObject({
      name: 'New User',
      email: 'new@example.com',
      typeUser: USER_TYPE_ENUM.USER,
    });
    expect(mockRepository.create).toBeCalled();
    expect(mockRepository.save).toBeCalledWith(newUser);
  });

  it('should find all users', async () => {
    const users = await service.getAllUsers();
    expect(users).toHaveLength(1);
    expect(mockRepository.find).toBeCalled();
  });
});
