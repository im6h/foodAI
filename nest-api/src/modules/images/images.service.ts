import { Pagination } from '@/custom/dtos/pagination';
import { calulatePagination } from '@/utils/calculatePagination';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { UserIdentity } from '../auth/auth.decorator';
import { ImageEntity } from './images.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly repository: Repository<ImageEntity>,
  ) {}

  async getImages(identity: UserIdentity, pagination: Pagination) {
    const [limit, offset] = calulatePagination(
      pagination.size,
      pagination.page,
    );
    const total = await this.repository.find({
      where: {
        userId: identity.sub,
      },
    });
    const result = await this.repository.find({
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

  async uploadImage(identity: UserIdentity, link: string) {
    await getConnection().transaction(async manager => {
      const image = manager.create(ImageEntity, {
        userId: identity.sub,
        link,
      });
      await manager.save(image);
      return {
        message: 'create_ok',
      };
    });
  }
}
