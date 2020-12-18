import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ForgotPasswordVerify {
  @ApiProperty({ description: 'id' })
  @IsNumber()
  @IsNotEmpty()
  @Transform(v => Number(v))
  id: number;

  // @ApiProperty({ description: 'email' })
  // @IsString()
  // @IsNotEmpty()
  // @Transform(v => v.trim())
  // newPassword: string;

  @ApiProperty({ description: 'email' })
  @IsString()
  @IsNotEmpty()
  @Transform(v => v.trim())
  token: string;
}
