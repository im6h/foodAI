import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserBasicEntity } from '@/modules/auth/basic/entities/basic.entity';

@Entity('Images')
export class ImageEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar')
  link?: string = '';

  @ManyToOne(() => UserBasicEntity)
  user?: UserBasicEntity;

  @Column()
  userId?: number;
}
