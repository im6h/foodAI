import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateStatusUser {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  status: number;

  @ApiProperty({
    required: false,
    example: 'Sai thông tin khoản vay',
  })
  @IsString()
  @IsOptional()
  reason: string;

}
