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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_user_decorator_1 = require("../auth/decorator/get-user.decorator");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const contact_service_1 = require("./contact.service");
const contact_dto_1 = require("./dto/contact.dto");
const search_contact_dto_1 = require("./dto/search-contact.dto");
let ContactController = class ContactController {
    contactService;
    constructor(contactService) {
        this.contactService = contactService;
    }
    create(userId, dto) {
        return this.contactService.create(userId, dto);
    }
    findAll(userId, query) {
        return this.contactService.findAll(userId, query);
    }
    update(userId, id, dto) {
        return this.contactService.update(userId, id, dto);
    }
    remove(userId, id) {
        return this.contactService.removeSoft(userId, id);
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a contact profile or trigger an automated Smart-Merge conflict resolution path' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Contact created cleanly or merged seamlessly on matching identity criteria.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Missing or malformed Authorization bearer token.' }),
    __param(0, (0, get_user_decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contact_dto_1.CreateContactDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Paginated index directory fetch with text partial-match filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Filtered search list records arrays loaded successfully.' }),
    __param(0, (0, get_user_decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, search_contact_dto_1.SearchContactDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Contact Unique unique string uuid token token reference ID' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update parameters for an active specific contact record' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contact modifications saved cleanly.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied to modification of records belonging to other users.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Active contact matching input record ID not found.' }),
    __param(0, (0, get_user_decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, contact_dto_1.UpdateContactDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Contact Unique unique string uuid token token reference ID' }),
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a record from contact visibility lists' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contact successfully moved to soft-delete archive.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Active contact matching input record ID not found.' }),
    __param(0, (0, get_user_decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "remove", null);
exports.ContactController = ContactController = __decorate([
    (0, swagger_1.ApiTags)('Contacts Directory Management'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('contacts'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map