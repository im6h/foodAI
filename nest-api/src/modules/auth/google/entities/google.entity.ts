import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity('UserGoogle')
export class UserGoogleEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ unique: true })
  userId: number;

  @Column({ type: 'varchar', unique: true })
  googleId: string;

  @Column({ type: 'simple-json' })
  data: object;
}
