import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentDto } from './dtos/create-content.dto';
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

  async getContentById(id: number): Promise<ContentEntity> {
    const content = await this.contentRepository.findOneBy({ id });
    if (!content) {
      throw new NotFoundException('Content not found');
    }
    await this.contentRepository.increment({ id }, 'viewCount', 1);

    // TODO: Verify if the increment is correct
    return { ...content, viewCount: content.viewCount + 1 };
  }

  async createContent(createContentDto: ContentDto): Promise<ContentEntity> {
    const newContent = this.contentRepository.create(createContentDto);

    await this.contentRepository.save(newContent);
    return newContent;
  }

  async updateContent(
    idContent: number,
    createContentDto: ContentDto,
  ): Promise<ContentEntity> {
    const content = await this.contentRepository.findOneBy({ id: idContent });
    if (!content) {
      throw new NotFoundException('Content not found');
    }

    await this.contentRepository.update({ id: idContent }, createContentDto);
    return { ...content, ...createContentDto };
  }

  async deleteContent(id: number): Promise<void> {
    await this.contentRepository.delete({ id });
  }
}
