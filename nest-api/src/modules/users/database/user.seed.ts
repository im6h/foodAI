/* tslint:disable:no-var-requires */
require('dotenv').config();
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    if (process.env.NODE_ENV !== 'production') {
      await factory(UserEntity)({ roles: [] }).seedMany(10);
    }
  }
}
