"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const prisma = new client_1.PrismaClient();
class AuthorService {
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.author.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorId = yield prisma.author.findUnique({
                where: { id }
            });
            if (!authorId) {
                throw boom_1.default.notFound('ID not found');
            }
            return authorId;
        });
    }
    createAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName } = author;
            return yield prisma.author.create({
                data: { firstName, lastName }
            });
        });
    }
    updateAuthor(id, author) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName } = author;
            const authorUpdated = yield prisma.author.update({
                where: { id },
                data: { firstName, lastName },
                select: { firstName: true, lastName: true }
            });
            if (!authorUpdated) {
                throw boom_1.default.notFound('Author not found');
            }
            return authorUpdated;
        });
    }
    deleteAuthor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.author.delete({ where: { id } });
        });
    }
}
exports.default = AuthorService;
//# sourceMappingURL=author.service.js.map