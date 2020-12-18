import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
// import { LoanEntity } from '../../../modules/loans/entities/loan.entity';
// @Entity('LocationCountry')
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  // @OneToMany(type => LoanEntity, loan => loan.country)
  // loans: LoanEntity[];
}
