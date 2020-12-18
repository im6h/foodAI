import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { StatesService } from '../services/states.service';
import { StateEntity } from '../entities/state.entity';

@ApiTags('Locations')
@Crud({
  model: {
    type: StateEntity,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@Controller('locations/states')
export class StatesController {
  constructor(public readonly service: StatesService) {}
}
