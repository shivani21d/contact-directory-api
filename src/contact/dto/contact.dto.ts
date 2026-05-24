// src/contact/dto/contact.dto.ts
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'John', description: 'First name of the contact' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the contact' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ 
    example: ['john.doe@example.com', 'j.doe@work.com'], 
    description: 'Array of unique email addresses bound to this profile',
    type: [String]
  })
  @IsArray()
  @IsEmail({}, { each: true })
  emails: string[];

  @ApiProperty({ 
    example: ['+1234567890', '+0987654321'], 
    description: 'Array of unique phone numbers bound to this profile',
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  phoneNumbers: string[];

  @ApiPropertyOptional({ example: 'Acme Corporation', description: 'Current corporate employer string' })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiPropertyOptional({ example: 'Met at tech conference 2026.', description: 'Custom text context notes field' })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateContactDto extends PartialType(CreateContactDto) {}