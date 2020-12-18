import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RoleParam {
  @ApiProperty()
  @IsString()
  @Transform(v => v.trim())
  id: string;
}
