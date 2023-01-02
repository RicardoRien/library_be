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
class BookService {
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.book.findMany({
                select: {
                    id: true,
                    title: true,
                    datePublished: true,
                    isFiction: true,
                    author: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        }
                    }
                }
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield prisma.book.findUnique({
                where: { id },
                select: {
                    id: true,
                    title: true,
                    isFiction: true,
                    datePublished: true,
                    author: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        }
                    }
                }
            });
            if (!book) {
                throw boom_1.default.notFound('ID not found');
            }
            return book;
        });
    }
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, authorId, datePublished, isFiction } = book;
            return yield prisma.book.create({
                data: { title, authorId, datePublished, isFiction }
            });
        });
    }
    updateBook(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, authorId, datePublished, isFiction } = book;
            const bookUpdated = yield prisma.book.update({
                where: { id },
                data: { title, authorId, datePublished, isFiction },
                select: {
                    title: true,
                    authorId: true,
                    datePublished: true,
                    isFiction: true
                }
            });
            if (!bookUpdated) {
                throw boom_1.default.notFound('Book not found');
            }
            return bookUpdated;
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.book.delete({ where: { id } });
        });
    }
}
exports.default = BookService;
//# sourceMappingURL=book.service.js.map