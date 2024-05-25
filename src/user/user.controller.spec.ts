import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAllUsers: jest
              .fn()
              .mockResolvedValue([
                {
                  id: 1,
                  name: 'Test User',
                  email: 'test@example.com',
                  userType: 'USER',
                  password: 'hashed',
                },
              ]),
            getUserById: jest
              .fn()
              .mockImplementation((id) => ({
                id,
                name: 'Test User',
                email: 'test@example.com',
                userType: 'USER',
                password: 'hashed',
              })),
            createUser: jest
              .fn()
              .mockImplementation((user) =>
                Promise.resolve({ id: Date.now(), ...user }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get user by id', async () => {
    const result = await controller.getUser(1);
    expect(result).toBeDefined();
    expect(service.getUserById).toBeCalledWith(1);
  });
});
