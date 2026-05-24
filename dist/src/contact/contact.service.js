"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContactService = class ContactService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
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
            const primary = existingContacts[0];
            const mergedEmails = Array.from(new Set([...primary.emails, ...dto.emails]));
            const mergedPhones = Array.from(new Set([...primary.phoneNumbers, ...dto.phoneNumbers]));
            const initialNotes = primary.notes ? [primary.notes] : [];
            if (dto.notes && !initialNotes.includes(dto.notes)) {
                initialNotes.push(dto.notes);
            }
            const mergedNotes = initialNotes.join(' | ');
            const mergedCompany = dto.company && dto.company.trim() !== '' ? dto.company : primary.company;
            const mergedLastName = dto.lastName || primary.lastName;
            return await this.prisma.$transaction(async (tx) => {
                await tx.mergeHistory.create({
                    data: {
                        contactId: primary.id,
                        mergedData: dto,
                    },
                });
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
                if (existingContacts.length > 1) {
                    const structuralDuplicates = existingContacts.slice(1).map(c => c.id);
                    await tx.contact.deleteMany({
                        where: { id: { in: structuralDuplicates } },
                    });
                }
                return updatedPrimary;
            });
        }
        return this.prisma.contact.create({
            data: {
                ...dto,
                userId,
            },
        });
    }
    async findAll(userId, query) {
        const { search, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const whereCondition = {
            userId,
            deletedAt: null,
        };
        if (search) {
            whereCondition.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { emails: { hasSome: [search] } },
                { phoneNumbers: { hasSome: [search] } },
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
    async update(userId, id, dto) {
        const contact = await this.prisma.contact.findFirst({
            where: { id, userId, deletedAt: null },
        });
        if (!contact)
            throw new common_1.NotFoundException('Contact data target not found.');
        return this.prisma.contact.update({
            where: { id },
            data: dto,
        });
    }
    async removeSoft(userId, id) {
        const contact = await this.prisma.contact.findFirst({
            where: { id, userId, deletedAt: null },
        });
        if (!contact)
            throw new common_1.NotFoundException('Contact profile active item target not found.');
        return this.prisma.contact.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactService);
//# sourceMappingURL=contact.service.js.map