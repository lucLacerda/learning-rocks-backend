import { Controller, Get, Query, Post, Body, Req, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiSecurity, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { CreateContentDto } from './dtos/create-content.dto';

@ApiTags('content')
@ApiSecurity('access-token')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  @ApiQuery({ name: 'idContent', required: false })
  getContent(@Query('idContent') idContent?: number) {
    if (idContent) {
      return this.contentService.getContentById(idContent);
    }
    return this.contentService.getAll();
  }

  @Post()
  @ApiBody({
    type: CreateContentDto,
    examples: {
      default: {
        value: {
          name: 'Sample Content',
          description: 'A sample content for demonstration.',
          contentType: 'VIDEO',
        },
      },
    },
  })
  create(@Body() createContentDto: CreateContentDto, @Req() req: Request) {
    if (req['user']?.role !== 'admin') {
      throw new ForbiddenException(
        'Only admins are allowed to perform this action',
      );
    }
    return this.contentService.createContent(createContentDto);
  }
}
