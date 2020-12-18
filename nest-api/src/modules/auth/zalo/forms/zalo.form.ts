import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ZaloForm {
  @ApiProperty({ description: 'access_token', default: 'token' })
  @IsNotEmpty()
  /* tslint:disable */
  access_token: string;
  /* tslint:enable */
}
