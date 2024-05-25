import { IsEnum, IsString } from 'class-validator';
import { CONTENT_TYPE_ENUM } from '../enum/content-type.enum';

export class CreateContentDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(CONTENT_TYPE_ENUM)
  contentType: CONTENT_TYPE_ENUM;
}
