import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserBasicEntity } from '../../../modules/auth/basic/entities/basic.entity';
import { ColumnText } from '../../../custom/columns';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @ApiProperty()
  @Column()
  firstName?: string = '';

  @ApiProperty()
  @Column()
  lastName?: string = '';

  @ApiProperty()
  @Column()
  avatar?: string = '';

  @ApiProperty()
  @Column()
  phoneNumber?: string = '';

  @Column('varchar')
  email?: string = '';

  @ApiProperty()
  @Column({ nullable: true, type: 'date' })
  birthday?: Date;

  @ApiProperty()
  @Column({ nullable: true })
  birthdayBack?: Date;

  @ApiProperty()
  @Column({ nullable: true })
  address?: string = '';

  @ApiProperty()
  @Column({ nullable: true })
  passport?: string = '';

  @ApiProperty()
  @Column()
  idCardOrTaxCode?: string = '';

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ApiProperty()
  @Column({
    type: 'tinyint',
    default: 0,
  })
  status: number;

  @ApiProperty()
  @Column({
    type: 'tinyint',
    default: 1,
    nullable: true,
  })
  type: number;

  @ApiProperty()
  @Column({
    default: '',
  })
  codeActive?: string;

  @ApiProperty()
  @Column({
    default: '',
  })
  tokenActive?: string;

  @ApiProperty()
  @Column({
    type: 'bigint',
    default: 0,
  })
  tokenExpire?: number;

  @Column({ nullable: true })
  reason?: string;

  @Column({ nullable: true })
  office?: string;

  @ColumnText()
  note: string;

  @Column({ nullable: true })
  defaultRole: string;

  @ApiProperty()
  @ManyToMany(() => RoleEntity, role => role.users)
  @JoinTable({
    name: 'UserRoles',
  })
  roles: RoleEntity[];

  basic: UserBasicEntity;
}
