import { Module } from '@nestjs/common';
import { ConstantsController } from './constants.controller';

@Module({
  controllers: [ConstantsController],
})
export class ConstantsModule {}
