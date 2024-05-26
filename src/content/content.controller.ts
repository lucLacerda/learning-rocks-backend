import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { ContentDto } from './dtos/create-content.dto';

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
    type: ContentDto,
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
  create(@Body() createContentDto: ContentDto, @Req() req: Request) {
    if (req['user']?.role !== 'admin') {
      throw new ForbiddenException(
        'Only admins are allowed to perform this action',
      );
    }
    return this.contentService.createContent(createContentDto);
  }

  @Put()
  @ApiQuery({ name: 'idContent', required: true })
  @ApiBody({
    type: ContentDto,
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
  update(
    @Query('idContent') idContent: number,
    @Body() createContentDto: ContentDto,
    @Req() req: Request,
  ) {
    if (req['user']?.role !== 'admin') {
      throw new ForbiddenException(
        'Only admins are allowed to perform this action',
      );
    }
    return this.contentService.updateContent(idContent, createContentDto);
  }

  @Delete()
  @ApiQuery({ name: 'idContent', required: true })
  delete(@Query('idContent') idContent: number, @Req() req: Request) {
    if (req['user']?.role !== 'admin') {
      throw new ForbiddenException(
        'Only admins are allowed to perform this action',
      );
    }
    return this.contentService.deleteContent(idContent);
  }
}
