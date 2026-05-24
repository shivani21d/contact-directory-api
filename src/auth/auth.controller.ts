// src/auth/auth.controller.ts
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Security Access Gateways')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a unique user account instance profile' })
  @ApiResponse({ status: 201, description: 'User account created successfully and access token returned.' })
  @ApiResponse({ status: 409, description: 'Email already exists.' })
  register(@Body() dto: AuthDto): Promise<{ access_token: string }> {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user credentials to generate JWT access keys' })
  @ApiResponse({ status: 200, description: 'JWT authentication payload generated cleanly.' })
  @ApiResponse({ status: 401, description: 'Invalid login credentials provided.' })
  login(@Body() dto: AuthDto): Promise<{ access_token: string }> {
    return this.authService.login(dto);
  }
}