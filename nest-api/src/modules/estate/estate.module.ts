import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstateEntity } from './entities/estate.entity';
import { EstateController } from './controllers/estate.controller';
import { EstateService } from './services/estate.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstateEntity])],
  controllers: [EstateController],
  providers: [EstateService],
  exports: [EstateService],
})
export class EstateModule {}
