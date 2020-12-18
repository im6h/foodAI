import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from '../entities/state.entity';

@Injectable()
export class StatesService extends TypeOrmCrudService<StateEntity> {
  constructor(
    @InjectRepository(StateEntity) repository: Repository<StateEntity>,
  ) {
    super(repository);
  }
}
