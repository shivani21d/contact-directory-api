// src/contact/contact.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ContactService } from './contact.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { SearchContactDto } from './dto/search-contact.dto';

@ApiTags('Contacts Directory Management')
@ApiBearerAuth('JWT-auth') // Ties these endpoints to the global authorize lock definition
@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create a contact profile or trigger an automated Smart-Merge conflict resolution path' })
  @ApiResponse({ status: 201, description: 'Contact created cleanly or merged seamlessly on matching identity criteria.' })
  @ApiResponse({ status: 401, description: 'Missing or malformed Authorization bearer token.' })
  create(@GetUser('id') userId: string, @Body() dto: CreateContactDto) {
    return this.contactService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Paginated index directory fetch with text partial-match filters' })
  @ApiResponse({ status: 200, description: 'Filtered search list records arrays loaded successfully.' })
  findAll(@GetUser('id') userId: string, @Query() query: SearchContactDto) {
    return this.contactService.findAll(userId, query);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'Contact Unique unique string uuid token token reference ID' })
  @ApiOperation({ summary: 'Update parameters for an active specific contact record' })
  @ApiResponse({ status: 200, description: 'Contact modifications saved cleanly.' })
  @ApiResponse({ status: 403, description: 'Access denied to modification of records belonging to other users.' })
  @ApiResponse({ status: 404, description: 'Active contact matching input record ID not found.' })
  update(
    @GetUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contactService.update(userId, id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Contact Unique unique string uuid token token reference ID' })
  @ApiOperation({ summary: 'Soft-delete a record from contact visibility lists' })
  @ApiResponse({ status: 200, description: 'Contact successfully moved to soft-delete archive.' })
  @ApiResponse({ status: 404, description: 'Active contact matching input record ID not found.' })
  remove(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.contactService.removeSoft(userId, id);
  }
}