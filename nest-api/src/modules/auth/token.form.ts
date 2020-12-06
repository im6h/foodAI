import { ApiProperty } from '@nestjs/swagger';

export class TokenForm {
  @ApiProperty()
  refreshToken: string;
}
