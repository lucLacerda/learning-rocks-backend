import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { CreateContentDto } from './dtos/create-content.dto';
import { CONTENT_TYPE_ENUM } from './enum/content-type.enum';

describe('ContentController', () => {
  let controller: ContentController;
  let service: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [
        {
          provide: ContentService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'Test Content',
                description: 'Description',
                contentType: 'VIDEO',
                viewCount: 0,
              },
            ]),
            getById: jest.fn().mockImplementation((id) =>
              Promise.resolve({
                id,
                name: 'Test Content',
                description: 'Description',
                contentType: 'VIDEO',
                viewCount: 0,
              }),
            ),
            createContent: jest
              .fn()
              .mockImplementation((dto) =>
                Promise.resolve({ id: Date.now(), ...dto }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<ContentController>(ContentController);
    service = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all contents', async () => {
    const result = await controller.getContent();
    expect(result).toHaveLength(1);
    expect(service.getAll).toBeCalled();
  });

  it('should get content by ID', async () => {
    const result = await controller.getContent(1);
    expect(result).toBeDefined();
    expect(service.getContentById).toBeCalledWith(1);
  });

  it('should create content', async () => {
    const dto: CreateContentDto = {
      name: 'New Video',
      description: 'A new video content',
      contentType: CONTENT_TYPE_ENUM.VIDEO,
    };
    const result = await controller.create(dto, {
      user: { role: 'admin' },
    } as any); // Mock Request object
    expect(result).toMatchObject({ ...dto, id: expect.any(Number) });
    expect(service.createContent).toBeCalledWith(dto);
  });
});
