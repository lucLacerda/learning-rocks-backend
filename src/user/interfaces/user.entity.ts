import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { USER_TYPE_ENUM } from '../enum/user-type.enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'userType', nullable: false })
  typeUser: USER_TYPE_ENUM;

  @Column({ name: 'password', nullable: false })
  password: string;
}
