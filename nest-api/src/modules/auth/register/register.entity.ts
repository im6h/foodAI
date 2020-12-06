import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('UserRegister')
export class UserRegisterEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  email?: string = '';

  @ApiProperty()
  @Column()
  password: string;
}
