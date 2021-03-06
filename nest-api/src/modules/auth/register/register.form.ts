/* tslint:disable */
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// tslint:disable: max-classes-per-file
export class RegisterForm {
  @ApiProperty({ example: 'quangthinh' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'doanduc.love@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  age?: number;

  @ApiProperty({ required: false })
  timeEat?: string;

  @ApiProperty({ required: false })
  dateOfBirth?: Date;

  @ApiProperty({ required: false })
  firstName?: string;

  @ApiProperty({ required: false })
  lastName?: string;

  @ApiProperty({ required: false })
  avatar?: string;
}

export class ActiveForm {
  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: '756757' })
  @IsNotEmpty()
  code: string;
}

export class ActiveTokenForm {
  @ApiProperty({})
  @IsNotEmpty()
  userId: number;

  @ApiProperty({})
  @IsNotEmpty()
  tokenActive: string;
}

export class ResendTokenForm {
  @ApiProperty({})
  @IsNotEmpty()
  id: number;

  @ApiProperty({})
  @IsNotEmpty()
  email: string;
}

export class TestEmail {
  @ApiProperty({ example: 'doanduc.love@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({})
  @IsNotEmpty()
  data: string;
}
