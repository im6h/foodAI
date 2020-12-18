import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordForm {
  @ApiProperty({ description: 'old password' })
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({ description: 'new password' })
  @IsNotEmpty()
  newPassword: string;
}
