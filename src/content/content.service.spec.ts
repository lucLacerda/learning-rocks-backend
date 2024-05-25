// src/content/content.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentService } from './content.service';
import { CreateContentDto } from './dtos/create-content.dto';
import { CONTENT_TYPE_ENUM } from './enum/content-type.enum';
import { ContentEntity } from './interfaces/content.entity';

describe('ContentService', () => {
  let service: ContentService;
  let mockRepository: Partial<Repository<ContentEntity>>;

  beforeEach(async () => {
    mockRepository = {
      findOneBy: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Test Content',
        description: 'Description',
        contentType: 'VIDEO',
        viewCount: 0,
      }),
      find: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: 'Test Content',
          description: 'Description',
          contentType: 'VIDEO',
          viewCount: 0,
        },
      ]),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest
        .fn()
        .mockImplementation((content) =>
          Promise.resolve({ ...content, id: Date.now() }),
        ),
      increment: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: getRepositoryToken(ContentEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create content', async () => {
    const dto: CreateContentDto = {
      name: 'New Video',
      description: 'A new video content',
      contentType: CONTENT_TYPE_ENUM.VIDEO,
    };
    const content = await service.createContent(dto);
    expect(content).toMatchObject(dto);
    expect(mockRepository.create).toBeCalled();
    expect(mockRepository.save).toBeCalledWith(content);
  });

  it('should find content by ID and increment view count', async () => {
    const content = await service.getContentById(1);
    expect(content).toBeDefined();
    expect(mockRepository.findOneBy).toBeCalledWith({ id: 1 });
    expect(mockRepository.increment).toBeCalledWith({ id: 1 }, 'viewCount', 1);
  });

  it('should return all contents', async () => {
    const contents = await service.getAll();
    expect(contents).toHaveLength(1);
    expect(mockRepository.find).toBeCalled();
  });
});
