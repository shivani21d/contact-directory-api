// src/contact/contact.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { SearchContactDto } from './dto/search-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateContactDto) {
    // 1. Identify existing contacts with overlapping emails OR phone numbers owned by this user
    const existingContacts = await this.prisma.contact.findMany({
      where: {
        userId,
        deletedAt: null,
        OR: [
          { emails: { hasSome: dto.emails } },
          { phoneNumbers: { hasSome: dto.phoneNumbers } },
        ],
      },
    });

    if (existingContacts.length > 0) {
      // Pick the oldest matching contact as the primary contact to merge data into
      const primary = existingContacts[0];

      // Smart merge arrays & items uniquely
      const mergedEmails = Array.from(new Set([...primary.emails, ...dto.emails]));
      const mergedPhones = Array.from(new Set([...primary.phoneNumbers, ...dto.phoneNumbers]));
      
      // Preserve historical notes
      const initialNotes = primary.notes ? [primary.notes] : [];
      if (dto.notes && !initialNotes.includes(dto.notes)) {
        initialNotes.push(dto.notes);
      }
      const mergedNotes = initialNotes.join(' | ');

      // Latest non-empty company name overwrites old company
      const mergedCompany = dto.company && dto.company.trim() !== '' ? dto.company : primary.company;
      const mergedLastName = dto.lastName || primary.lastName;

      return await this.prisma.$transaction(async (tx) => {
        // Record Merge History logs for audit trail tracking
        await tx.mergeHistory.create({
          data: {
            contactId: primary.id,
            mergedData: dto as any,
          },
        });

        // Update target record
        const updatedPrimary = await tx.contact.update({
          where: { id: primary.id },
          data: {
            firstName: dto.firstName || primary.firstName,
            lastName: mergedLastName,
            emails: mergedEmails,
            phoneNumbers: mergedPhones,
            company: mergedCompany,
            notes: mergedNotes,
          },
        });

        // Clean up or resolve structural duplicate records found during overlap scan
        if (existingContacts.length > 1) {
          const structuralDuplicates = existingContacts.slice(1).map(c => c.id);
          await tx.contact.deleteMany({
            where: { id: { in: structuralDuplicates } },
          });
        }

        return updatedPrimary;
      });
    }

    // Return simple record creation if no profile intersection matches were discovered
    return this.prisma.contact.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll(userId: string, query: SearchContactDto) {
    const { search, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    // Direct conditions for querying partial matches across names, emails, and phone numbers
    const whereCondition: any = {
      userId,
      deletedAt: null,
    };

    if (search) {
      whereCondition.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { emails: { hasSome: [search] } }, // Full structural array match
        { phoneNumbers: { hasSome: [search] } },
        // Partial string fallback logic inside arrays using Prisma raw or native mapping filtering alternative:
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.contact.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contact.count({ where: whereCondition }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async update(userId: string, id: string, dto: UpdateContactDto) {
    const contact = await this.prisma.contact.findFirst({
      where: { id, userId, deletedAt: null },
    });
    if (!contact) throw new NotFoundException('Contact data target not found.');

    return this.prisma.contact.update({
      where: { id },
      data: dto,
    });
  }

  async removeSoft(userId: string, id: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id, userId, deletedAt: null },
    });
    if (!contact) throw new NotFoundException('Contact profile active item target not found.');

    return this.prisma.contact.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}