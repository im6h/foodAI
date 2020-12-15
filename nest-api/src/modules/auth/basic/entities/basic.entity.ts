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

  @Column()
  age?: number = 0;

  @Column()
  timeEat?: string = '';

  @Column()
  dateOfBirth?: Date;

  @Column()
  width?: string;

  @Column()
  height?: string;
}
