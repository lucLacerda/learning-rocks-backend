import { IsEnum, IsString } from 'class-validator';
import { CONTENT_TYPE_ENUM } from '../enum/content-type.enum';

export class ContentDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(CONTENT_TYPE_ENUM, {
    message: 'contentType must be either VIDEO, PDF, or IMAGE',
  })
  contentType: CONTENT_TYPE_ENUM;
}
