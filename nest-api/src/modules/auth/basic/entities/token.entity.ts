import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Token')
export class TokenEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  userId: number;

  @Column()
  token: string;

  @Column({ type: 'bigint' })
  expireIn: number;
}
