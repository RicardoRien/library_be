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
const express_1 = __importDefault(require("express"));
const validator_handler_1 = require("../middleware/validator.handler");
const book_schema_1 = require("../schemas/book.schema");
const book_service_1 = __importDefault(require("../services/book.service"));
const router = express_1.default.Router();
const service = new book_service_1.default;
router.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBooks = yield service.find();
        res.json({ data: allBooks });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', (0, validator_handler_1.validatorHandler)(book_schema_1.createBookSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newBook = yield service.createBook(body);
        res.status(201).json(newBook);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (0, validator_handler_1.validatorHandler)(book_schema_1.getBookSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const books = yield service.findById(+id);
        res.json({ data: books });
    }
    catch (error) {
        next(error);
    }
}));
router.put('/:id', (0, validator_handler_1.validatorHandler)(book_schema_1.getBookSchema), (0, validator_handler_1.validatorHandler)(book_schema_1.createBookSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const bookUpdated = yield service.updateBook(+id, body);
        res.status(201).json({ data: bookUpdated });
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', (0, validator_handler_1.validatorHandler)(book_schema_1.getBookSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const author = yield service.deleteBook(+id);
        res.status(200).json({ data: author });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=book.router.js.map