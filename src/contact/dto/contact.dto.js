"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContactDto = exports.CreateContactDto = void 0;
// src/contact/dto/contact.dto.ts
var class_validator_1 = require("class-validator");
var CreateContactDto = function () {
    var _a;
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _firstName_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    var _emails_decorators;
    var _emails_initializers = [];
    var _emails_extraInitializers = [];
    var _phoneNumbers_decorators;
    var _phoneNumbers_initializers = [];
    var _phoneNumbers_extraInitializers = [];
    var _company_decorators;
    var _company_initializers = [];
    var _company_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateContactDto() {
                this.firstName = __runInitializers(this, _firstName_initializers, void 0);
                this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
                this.emails = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _emails_initializers, void 0));
                this.phoneNumbers = (__runInitializers(this, _emails_extraInitializers), __runInitializers(this, _phoneNumbers_initializers, void 0));
                this.company = (__runInitializers(this, _phoneNumbers_extraInitializers), __runInitializers(this, _company_initializers, void 0));
                this.notes = (__runInitializers(this, _company_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                __runInitializers(this, _notes_extraInitializers);
            }
            return CreateContactDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _firstName_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _lastName_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _emails_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsEmail)({}, { each: true })];
            _phoneNumbers_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _company_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _notes_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _emails_decorators, { kind: "field", name: "emails", static: false, private: false, access: { has: function (obj) { return "emails" in obj; }, get: function (obj) { return obj.emails; }, set: function (obj, value) { obj.emails = value; } }, metadata: _metadata }, _emails_initializers, _emails_extraInitializers);
            __esDecorate(null, null, _phoneNumbers_decorators, { kind: "field", name: "phoneNumbers", static: false, private: false, access: { has: function (obj) { return "phoneNumbers" in obj; }, get: function (obj) { return obj.phoneNumbers; }, set: function (obj, value) { obj.phoneNumbers = value; } }, metadata: _metadata }, _phoneNumbers_initializers, _phoneNumbers_extraInitializers);
            __esDecorate(null, null, _company_decorators, { kind: "field", name: "company", static: false, private: false, access: { has: function (obj) { return "company" in obj; }, get: function (obj) { return obj.company; }, set: function (obj, value) { obj.company = value; } }, metadata: _metadata }, _company_initializers, _company_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateContactDto = CreateContactDto;
var UpdateContactDto = function () {
    var _a;
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _firstName_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    var _emails_decorators;
    var _emails_initializers = [];
    var _emails_extraInitializers = [];
    var _phoneNumbers_decorators;
    var _phoneNumbers_initializers = [];
    var _phoneNumbers_extraInitializers = [];
    var _company_decorators;
    var _company_initializers = [];
    var _company_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateContactDto() {
                this.firstName = __runInitializers(this, _firstName_initializers, void 0);
                this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
                this.emails = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _emails_initializers, void 0));
                this.phoneNumbers = (__runInitializers(this, _emails_extraInitializers), __runInitializers(this, _phoneNumbers_initializers, void 0));
                this.company = (__runInitializers(this, _phoneNumbers_extraInitializers), __runInitializers(this, _company_initializers, void 0));
                this.notes = (__runInitializers(this, _company_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                __runInitializers(this, _notes_extraInitializers);
            }
            return UpdateContactDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _firstName_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _lastName_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _emails_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)({}, { each: true })];
            _phoneNumbers_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ each: true })];
            _company_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _notes_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _emails_decorators, { kind: "field", name: "emails", static: false, private: false, access: { has: function (obj) { return "emails" in obj; }, get: function (obj) { return obj.emails; }, set: function (obj, value) { obj.emails = value; } }, metadata: _metadata }, _emails_initializers, _emails_extraInitializers);
            __esDecorate(null, null, _phoneNumbers_decorators, { kind: "field", name: "phoneNumbers", static: false, private: false, access: { has: function (obj) { return "phoneNumbers" in obj; }, get: function (obj) { return obj.phoneNumbers; }, set: function (obj, value) { obj.phoneNumbers = value; } }, metadata: _metadata }, _phoneNumbers_initializers, _phoneNumbers_extraInitializers);
            __esDecorate(null, null, _company_decorators, { kind: "field", name: "company", static: false, private: false, access: { has: function (obj) { return "company" in obj; }, get: function (obj) { return obj.company; }, set: function (obj, value) { obj.company = value; } }, metadata: _metadata }, _company_initializers, _company_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateContactDto = UpdateContactDto;
