import { ContactService } from './contact.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { SearchContactDto } from './dto/search-contact.dto';
export declare class ContactController {
    private contactService;
    constructor(contactService: ContactService);
    create(userId: string, dto: CreateContactDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string | null;
        emails: string[];
        phoneNumbers: string[];
        company: string | null;
        notes: string | null;
        userId: string;
        deletedAt: Date | null;
    }>;
    findAll(userId: string, query: SearchContactDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string | null;
            emails: string[];
            phoneNumbers: string[];
            company: string | null;
            notes: string | null;
            userId: string;
            deletedAt: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    update(userId: string, id: string, dto: UpdateContactDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string | null;
        emails: string[];
        phoneNumbers: string[];
        company: string | null;
        notes: string | null;
        userId: string;
        deletedAt: Date | null;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string | null;
        emails: string[];
        phoneNumbers: string[];
        company: string | null;
        notes: string | null;
        userId: string;
        deletedAt: Date | null;
    }>;
}
