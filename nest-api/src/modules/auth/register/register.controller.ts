import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterForm } from './register.form';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() payload: RegisterForm) {
    return await this.registerService.create(payload);
  }
}
