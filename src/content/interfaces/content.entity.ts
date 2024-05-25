import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CONTENT_TYPE_ENUM } from '../enum/content-type.enum';

@Entity({ name: 'content' })
export class ContentEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'contentType', nullable: false })
  contentType: CONTENT_TYPE_ENUM;

  @Column({ name: 'viewCount', nullable: false, default: 0 })
  viewCount: number;
}
