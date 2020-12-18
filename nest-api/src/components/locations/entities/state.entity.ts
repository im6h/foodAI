import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

// @Entity('LocationState')
export class StateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  countryId: string;

  @Column()
  name: string;
}
