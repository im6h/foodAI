import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsBoolean, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { TypeRole } from '../entities/role.entity';
export class UpdateRole {
  @ApiProperty({ description: 'Tên của role', example: 'admin' })
  @IsNotEmpty()
  @IsString()
  @Transform(v => v.trim())
  title?: string;

  @ApiProperty({ description: 'Mã của role', example: 'admin' })
  @IsNotEmpty()
  @IsString()
  @Transform(v => v.trim())
  code?: string;

  @ApiProperty({ description: 'Chú thích role', example: 'admin' })
  @IsString()
  @Transform(v => v.trim())
  description?: string;

  @ApiProperty({ description: 'Trạng thái role', example: 'true' })
  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsEnum(TypeRole)
  @ApiProperty({ type: 'string', enum: TypeRole })
  typeRole: TypeRole;

  @ApiProperty({})
  @IsNotEmpty()
  @IsArray()
  permissions?: object[];
}
