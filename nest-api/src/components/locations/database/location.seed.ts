import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CountryEntity } from '../entities/country.entity';
import { CityEntity } from '../entities/city.entity';
import { ProvinceEntity } from '../entities/province.entity';
import { WardEntity } from '../entities/ward.entity';
import citys = require('./json/citys.json');
import provinces = require('./json/provinces.json');
import wards = require('./json/wards.json');

export default class CreateLocations implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const contries = await connection.getRepository(CountryEntity).count();
    if (contries <= 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(CountryEntity)
        .values([{ code: '84', name: 'Việt Nam' }])
        .execute();
    }

    const cityCount = await connection.getRepository(CityEntity).count();
    if (cityCount <= 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(CityEntity)
        .values(citys)
        .execute();
    }

    const provinceCount = await connection
      .getRepository(ProvinceEntity)
      .count();
    if (provinceCount <= 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(ProvinceEntity)
        .values(provinces)
        .execute();
    }

    const wardCount = await connection.getRepository(WardEntity).count();
    if (wardCount <= 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(WardEntity)
        .values(wards)
        .execute();
    }
  }
}
