import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterEntity {
  id?: number;

  username: string;

  email?: string = '';

  password: string;
}
