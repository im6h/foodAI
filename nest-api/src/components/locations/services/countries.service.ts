import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from '../entities/country.entity';

@Injectable()
export class CountriesService extends TypeOrmCrudService<CountryEntity> {
  constructor(
    @InjectRepository(CountryEntity) repository: Repository<CountryEntity>,
  ) {
    super(repository);
  }
}
