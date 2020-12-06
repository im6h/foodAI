import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsOptional } from 'class-validator';

export class UpdateProfileForm {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  age?: number;

  @ApiProperty()
  timeEat?: string;
}
