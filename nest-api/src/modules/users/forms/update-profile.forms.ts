import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsOptional } from 'class-validator';

export class UpdateProfileForm {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty({ required: false })
  age?: number;

  @ApiProperty({ required: false })
  timeEat?: string;

  @ApiProperty({ required: false })
  width?: string;

  @ApiProperty({ required: false })
  height?: string;

  @ApiProperty({ required: false })
  dateOfBirth?: Date;
}
