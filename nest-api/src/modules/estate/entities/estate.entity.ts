import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';

// @Entity('Estate')
export class EstateEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column()
  idEstate?: string = '';

  @ApiProperty()
  @Column()
  type?: string = '';

  @ManyToOne(() => UserEntity)
  user?: UserEntity;

  @Column()
  userId?: number;
}
