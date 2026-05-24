export declare class CreateContactDto {
    firstName: string;
    lastName?: string;
    emails: string[];
    phoneNumbers: string[];
    company?: string;
    notes?: string;
}
declare const UpdateContactDto_base: import("@nestjs/common").Type<Partial<CreateContactDto>>;
export declare class UpdateContactDto extends UpdateContactDto_base {
}
export {};
