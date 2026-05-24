import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'user@example.com', description: 'Unique user account email' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'secret123', description: 'Account password minimum length 6' })
  @IsString()
  @MinLength(6)
  password!: string;
}