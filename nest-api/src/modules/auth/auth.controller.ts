import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokenService } from './token.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly tokenService: TokenService) {}
}
