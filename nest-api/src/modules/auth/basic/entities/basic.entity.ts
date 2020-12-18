import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

// import { UserEntity } from '../../../users/entities/user.entity';

@Entity('UserBasic')
export class UserBasicEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ type: 'varchar' })
  username?: string = '';

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ type: 'varchar' })
  email?: string = '';

  @Exclude()
  @Column('varchar')
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 12);
    }
  }

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  age?: number = 0;

  @Column({ nullable: true })
  timeEat?: string = '';

  @Column({ nullable: true })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  weight?: string;

  @Column({ nullable: true })
  height?: string;
}
