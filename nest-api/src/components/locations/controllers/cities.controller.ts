import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { CityEntity } from '../entities/city.entity';
import { Controller } from '@nestjs/common';
import { CitiesService } from '../services/cities.service';

@ApiTags('Locations')
@Crud({
  model: {
    type: CityEntity,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@Controller('locations/cities')
export class CitiesController {
  constructor(public readonly service: CitiesService) {}
}
