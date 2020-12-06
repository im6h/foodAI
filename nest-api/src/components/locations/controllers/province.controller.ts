import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { ProvinceEntity } from '../entities/province.entity';
import { Controller } from '@nestjs/common';
import { ProvinceService } from '../services/province.service';

@ApiTags('Locations')
@Crud({
  model: {
    type: ProvinceEntity,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@Controller('locations/province')
export class ProvinceController {
  constructor(public readonly service: ProvinceService) {}
}
