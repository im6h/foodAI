import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPassword {
  @ApiProperty({ description: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
