import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class ImagesBodyPostForm {
  @ApiProperty({ description: 'url link' })
  @IsUrl()
  link?: string;

  @ApiProperty({ description: 'detail info' })
  detail?: string;
}
