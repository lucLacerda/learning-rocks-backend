import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dtos/create-content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  getContent(@Query('id') id?: number) {
    if (id) {
      return this.contentService.getById(id);
    }
    return this.contentService.getAll();
  }

  @Post()
  create(@Body() createContentDto: CreateContentDto, @Req() req: Request) {
    if (req['user']?.role !== 'admin') {
      throw new ForbiddenException(
        'Only admins are allowed to perform this action',
      );
    }
    return this.contentService.createContent(createContentDto);
  }
}
