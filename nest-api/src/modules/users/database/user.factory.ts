import Faker from 'faker/locale/vi';
import { define } from 'typeorm-seeding';
import { UserEntity } from '../entities/user.entity';

define(UserEntity, (faker: typeof Faker, settings: { roles: string[] }) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const idCard = '' + faker.random.number({ max: 99999999, min: 10000000 });
  const phoneNumber = faker.phone.phoneNumber();
  const avatar = faker.image.imageUrl();

  const user = new UserEntity();
  user.firstName = firstName;
  user.lastName = lastName;
  user.idCardOrTaxCode = idCard;
  user.phoneNumber = phoneNumber;
  user.avatar = avatar;
  user.status = 1;

  return user;
});
