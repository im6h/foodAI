import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class PermissionsService extends TypeOrmCrudService<PermissionEntity> {
  constructor(@InjectRepository(PermissionEntity) repository) {
    super(repository);
  }
}
