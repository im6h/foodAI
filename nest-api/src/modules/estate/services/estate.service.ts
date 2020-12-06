import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstateEntity } from '../entities/estate.entity';
import { UserIdentity } from '../../auth/auth.decorator';
import { Pagination } from '@/custom/dtos/pagination';
import { EstateCreate } from '../dto/estate.create.dto';
import { calulatePagination } from '@/utils/calculatePagination';
import { ErrorCode } from '@/common/constants';

@Injectable()
export class EstateService {
  constructor(
    @InjectRepository(EstateEntity)
    private estateRepository: Repository<EstateEntity>,
  ) {}

  async findByUserId(identity: UserIdentity, pagination: Pagination) {
    const [limit, offset] = calulatePagination(
      pagination.size,
      pagination.page,
    );
    const total = await this.estateRepository.find({
      where: {
        userId: identity.sub,
      },
    });
    const result = await this.estateRepository.find({
      where: {
        userId: identity.sub,
      },
      skip: offset,
      take: limit,
    });
    return {
      total: total.length,
      payload: result,
    };
  }

  async add(
    identity: UserIdentity,
    estateEntity: EstateCreate,
  ): Promise<EstateEntity> {
    const estate = await this.estateRepository.findOne({
      where: {
        userId: identity.sub,
        idEstate: estateEntity.idEstate,
      },
    });
    if (estate) {
      throw new BadRequestException(ErrorCode.ESTATE_DUPLICATE);
    }
    if (identity.sub === null) {
      throw new NotFoundException(ErrorCode.USER_NOT_EXISTS);
    }
    const newEstate: EstateEntity = {
      idEstate: estateEntity.idEstate,
      userId: identity.sub,
      type: estateEntity.type,
    };
    await this.estateRepository.insert(newEstate);
    return newEstate;
  }

  async remove(identity: UserIdentity, id: number): Promise<void> {
    const estate = await this.estateRepository.findOne({
      where: {
        userId: identity.sub,
        idEstate: id,
      },
    });
    if (!estate) {
      throw new NotFoundException(ErrorCode.ESTATE_EXISTS);
    } else {
      await this.estateRepository.delete(estate);
    }
  }
}
