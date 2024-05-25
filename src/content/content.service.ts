import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContentDto } from './dtos/create-content.dto';
import { ContentEntity } from './interfaces/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
  ) {}

  async getAll(): Promise<ContentEntity[]> {
    return this.contentRepository.find();
  }

  async getById(id: number): Promise<ContentEntity> {
    const content = await this.contentRepository.findOneBy({ id });
    if (!content) {
      throw new NotFoundException('Content not found');
    }
    await this.contentRepository.increment({ id }, 'viewCount', 1);

    // TODO: Verify if the increment is correct
    return { ...content, viewCount: content.viewCount + 1 };
  }

  async createContent(
    createContentDto: CreateContentDto,
  ): Promise<ContentEntity> {
    const newContent = this.contentRepository.create(createContentDto);

    await this.contentRepository.save(newContent);
    return newContent;
  }
}
