import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUser {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(v => v.trim())
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(v => v.trim())
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(v => v.trim())
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idCardOrTaxCode: string;

  @ApiProperty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsOptional()
  company: number;

  @ApiProperty()
  @IsOptional()
  superior: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  office: string;

  @IsOptional()
  @ApiProperty({ required: false })
  note: string;

  @ApiProperty()
  roles: string[];
}
