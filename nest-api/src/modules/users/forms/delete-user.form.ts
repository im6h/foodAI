import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeleteUserForm {
  @ApiProperty()
  @IsNumber()
  @Transform(v => Number(v))
  id: number;
}
