import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BasicForm {
  @ApiProperty({ description: 'Tên đăng nhập', example: 'admin' })
  @IsNotEmpty()
  uid: string;

  @ApiProperty({ description: 'Mật khẩu', example: 'admin@1234' })
  @IsNotEmpty()
  password: string;
}
