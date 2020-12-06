import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WardEntity } from '../entities/ward.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WardsService extends TypeOrmCrudService<WardEntity> {
  constructor(
    @InjectRepository(WardEntity) public repository: Repository<WardEntity>,
  ) {
    super(repository);
  }

  async getAllWards(query) {
    const createQuery = this.repository.createQueryBuilder('ward');
    if (query.provinceCode) {
      createQuery.andWhere('ward.provinceCode = :provinceCode', { provinceCode: query.provinceCode });
    }
    if (query.name) {
      createQuery.andWhere('ward.name = :name', { name: query.name });
    }
    return await createQuery.getMany();
  }
}
