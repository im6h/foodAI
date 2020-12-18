import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// tslint:disable: max-classes-per-file
export class QueryLocationCitiesApp {
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;
}

export class QueryLocationProvinceApp {
  @IsOptional()
  @ApiProperty({ required: false })
  cityCode: string;

  @IsOptional()
  @ApiProperty({ required: false })
  name: string;
}

export class QueryLocationWardsApp {
  @IsOptional()
  @ApiProperty({ required: false })
  provinceCode: string;

  @IsOptional()
  @ApiProperty({ required: false })
  name: string;
}
