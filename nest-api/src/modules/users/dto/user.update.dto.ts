import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUser {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Transform(v => v.trim())
  firstName: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Transform(v => v.trim())
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatar: string;

  // @IsOptional()
  // @ApiProperty({ required: false })
  // @IsString()
  // phoneNumber: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  idCardOrTaxCode: string;

  @ApiProperty({ required: false })
  @IsOptional()
  password: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsOptional()
  type: number;

  @ApiProperty({ required: false })
  @IsOptional()
  company: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  office: string;

  @ApiProperty({ required: false })
  @IsOptional()
  status: number;

  @IsOptional()
  @ApiProperty({ required: false })
  note: string;

  @IsOptional()
  @ApiProperty({ example: [1, 2], required: false })
  @IsNotEmpty()
  @Transform(v => (Array.isArray(v) ? v.map(String) : v.split(',').map(String)))
  roles: string[];
}
