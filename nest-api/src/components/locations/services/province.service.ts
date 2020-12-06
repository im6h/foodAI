import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinceEntity } from '../entities/province.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceService extends TypeOrmCrudService<ProvinceEntity> {
  constructor(
    @InjectRepository(ProvinceEntity) public repository: Repository<ProvinceEntity>,
  ) {
    super(repository);
  }

  async getAllProvince(query) {
    const createQuery = this.repository.createQueryBuilder('province');
    if (query.cityCode) {
      createQuery.andWhere('province.cityCode = :cityCode', { cityCode: query.cityCode });
    }
    if (query.name) {
      createQuery.andWhere('province.name = :name', { name: query.name });
    }
    return await createQuery.getMany();
  }
}
