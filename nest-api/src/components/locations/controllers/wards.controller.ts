import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { WardEntity } from '../entities/ward.entity';
import { Controller } from '@nestjs/common';
import { WardsService } from '../services/wards.service';

@ApiTags('Locations')
@Crud({
  model: {
    type: WardEntity,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@Controller('locations/wards')
export class WardsController {
  constructor(public readonly service: WardsService) {}
}
