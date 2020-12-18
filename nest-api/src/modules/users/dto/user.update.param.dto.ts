import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateUserParam {
  @ApiProperty()
  @IsNumber()
  @Transform(v => Number(v))
  id: number;
}
