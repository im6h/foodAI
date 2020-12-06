import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PERMISSION_TABLE } from '../constants';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity(PERMISSION_TABLE)
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'admin' })
  @Column()
  title: string;

  @ApiProperty({ example: 'create|read|update|delete' })
  @IsNotEmpty()
  @Column()
  resource: string;

  @ApiProperty({ example: '*:any' })
  @IsNotEmpty()
  @Column({
    default: '*:any',
  })
  /**
   *  Defines the possession of the resource for the specified action.
   *
   *  possible values:
   *
   * - `own`: Indicates that the action is (or not) to be performed on `own`
   *  resource(s) of the current subject.
   *
   * - `any`: Indicates that the action is (or not) to be performed on `any`
   *  resource(s); including `own` resource(s) of the current subject.
   *
   */
  action: string;

  @ApiProperty({ example: '' })
  @Column({
    default: '',
  })
  attributes: string;

  @ApiProperty({ example: true })
  @Column({
    default: true,
  })
  isActive: boolean;
}
