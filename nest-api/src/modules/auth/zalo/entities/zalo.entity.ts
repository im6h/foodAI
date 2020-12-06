import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('UserZalo')
export class UserZaloEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ unique: true })
  userId: number;

  @Column({ type: 'varchar', unique: true })
  zaloId: string;

  @Column({ type: 'simple-json' })
  data: object;
}
