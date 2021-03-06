import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserListQueryClient {

  @IsOptional()
  @ApiProperty({ required: false })
  queries: string;

  @IsOptional()
  @ApiProperty({ required: false })
  status: number;

  @IsOptional()
  @ApiProperty({ required: false })
  company: number;

  @IsOptional()
  @ApiProperty({ required: false })
  type: string;

}
