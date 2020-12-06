import { getRepository } from 'typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';

export const checkRole = async identity => {
  const foundUser = await getRepository(UserEntity)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.roles', 'role')
    .where('user.id = :id', { id: identity.sub })
    .getOne();

  const result = {
    foundUser,
  };

  return result;
};
