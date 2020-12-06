import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EstateCreate {
  @ApiProperty({
    type: String,
    description: 'id của bất động sản cần lưu',
  })
  @IsNotEmpty()
  @IsString()
  idEstate: string;

  @ApiProperty({
    type: String,
    description: 'type của bất động sản cần lưu',
  })
  @IsNotEmpty()
  @IsString()
  type: string;
}
