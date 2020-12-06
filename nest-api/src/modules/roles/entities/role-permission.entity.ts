import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ROLE_PERMISSION_TABLE } from '../constants';
import { ApiProperty } from '@nestjs/swagger';

@Entity(ROLE_PERMISSION_TABLE)
export class RolePermissionEntity {
  @PrimaryColumn('uuid')
  roleId: string;

  @PrimaryColumn('uuid')
  permissionId: string;

  @ApiProperty({ example: true })
  @Column({
    default: false,
  })
  read: boolean;

  @ApiProperty({ example: true })
  @Column({
    default: false,
  })
  create: boolean;

  @ApiProperty({ example: false })
  @Column({
    default: false,
  })
  update: boolean;

  @ApiProperty({ example: false })
  @Column({
    default: false,
  })
  delete: boolean;

  @ApiProperty({ example: false })
  @Column({
    default: false,
  })
  import: boolean;

  @ApiProperty({ example: false })
  @Column({
    default: false,
  })
  export: boolean;
}
