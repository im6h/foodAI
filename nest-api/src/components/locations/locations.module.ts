import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './entities/country.entity';
import { StateEntity } from './entities/state.entity';
import { CityEntity } from './entities/city.entity';
import { WardEntity } from './entities/ward.entity';
import { ProvinceEntity } from './entities/province.entity';
import { CitiesService } from './services/cities.service';
import { WardsService } from './services/wards.service';
import { ProvinceService } from './services/province.service';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesController } from './controllers/cities.controller';
import { CountriesController } from './controllers/countries.controller';
import { StatesController } from './controllers/states.controller';
import { WardsController } from './controllers/wards.controller';
import { ProvinceController } from './controllers/province.controller';
import { LocationAppController } from './controllers/location.app.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity, StateEntity, CityEntity, ProvinceEntity, WardEntity])],
  controllers: [CitiesController, CountriesController, StatesController, WardsController, ProvinceController, LocationAppController],
  providers: [CitiesService, CountriesService, StatesService, WardsService, ProvinceService],
})
export class LocationsModule { }
