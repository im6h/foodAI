import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CheckEmailToken {
  @ApiProperty({ description: 'id' })
  @IsNumber()
  @IsNotEmpty()
  @Transform(v => Number(v))
  id: number;

  @ApiProperty({ description: 'Code in email' })
  @IsString()
  @IsNotEmpty()
  @Transform(v => v.trim())
  email: string;
}
