import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '../entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService extends TypeOrmCrudService<CityEntity> {
  constructor(
    @InjectRepository(CityEntity) public repository: Repository<CityEntity>,
  ) {
    super(repository);
  }

  async getAllCities(query) {
    const createQuery = this.repository.createQueryBuilder('city')
      .andWhere('city.countryId = 84');
    if (query.name) {
      createQuery.andWhere('city.name = :name', { name: query.name });
    }
    return await createQuery.getMany();
  }
}
