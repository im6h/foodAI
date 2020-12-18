import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsBoolean, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { TypeRole } from '../entities/role.entity';

export class CreateRole {
  @ApiProperty({ description: 'Mã của role', example: 'admin' })
  @IsNotEmpty()
  @IsString()
  @Transform(v => v.trim())
  code?: string;

  @ApiProperty({ description: 'Tên của role', example: 'admin' })
  @IsNotEmpty()
  @IsString()
  @Transform(v => v.trim())
  title?: string;

  @ApiProperty({ description: 'Chú thích role', example: 'admin' })
  @IsNotEmpty()
  @IsString()
  @Transform(v => v.trim())
  description?: string;

  @ApiProperty({ description: 'Công ty', example: 1 })
  @IsOptional()
  @IsNumber()
  brandId?: number;

  @IsOptional()
  @IsEnum(TypeRole)
  @ApiProperty({ type: 'string', enum: TypeRole })
  typeRole: TypeRole;

  @ApiProperty({ description: 'Trạng thái role', example: 'true' })
  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({})
  @IsNotEmpty()
  @IsArray()
  permissions?: object[];
}
