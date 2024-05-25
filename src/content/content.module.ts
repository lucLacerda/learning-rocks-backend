import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentEntity } from './interfaces/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ContentEntity])],
  providers: [ContentService],
  controllers: [ContentController]
})
export class ContentModule {}
