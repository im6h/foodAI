import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { CountryEntity } from '../entities/country.entity';
import { CountriesService } from '../services/countries.service';

@ApiTags('Locations')
@Crud({
  model: {
    type: CountryEntity,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@Controller('locations/countries')
export class CountriesController {
  constructor(public readonly service: CountriesService) {}
}
