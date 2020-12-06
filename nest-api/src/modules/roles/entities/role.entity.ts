import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ROLE_TABLE } from '../constants';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';

export enum TypeRole {
  IS_ADMIN = 'IS_ADMIN',
  IS_CUSTOMER = 'IS_CUSTOMER',
}

@Entity(ROLE_TABLE)
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @Column()
  code: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @Column()
  title: string;

  @ApiProperty({ example: '' })
  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @Column()
  @ApiProperty({ type: 'string', enum: TypeRole })
  typeRole: TypeRole;

  @ApiProperty({ example: true })
  @IsBoolean()
  @Column({
    default: true,
  })
  isActive: boolean;

  @ManyToMany(type => UserEntity , user => user.roles, {
    onDelete: 'NO ACTION',
  })
  users: RoleEntity[];
}
