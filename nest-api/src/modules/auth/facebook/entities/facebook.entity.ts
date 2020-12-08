import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity('UserFacebook')
export class UserFacebookEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ unique: true })
  userId: number;

  @Column({ type: 'varchar', unique: true })
  facebookId: string;

  @Column({ type: 'simple-json' })
  data: object;
}
