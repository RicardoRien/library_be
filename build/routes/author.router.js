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
const author_schema_1 = require("../schemas/author.schema");
const author_service_1 = __importDefault(require("../services/author.service"));
const router = express_1.default.Router();
const service = new author_service_1.default;
router.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAuthors = yield service.find();
        res.json({ data: allAuthors });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', (0, validator_handler_1.validatorHandler)(author_schema_1.createUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newAuthor = yield service.createAuthor(body);
        res.status(201).json(newAuthor);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (0, validator_handler_1.validatorHandler)(author_schema_1.getAuthorSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const author = yield service.findById(+id);
        res.json({ data: author });
    }
    catch (error) {
        next(error);
    }
}));
router.put('/:id', (0, validator_handler_1.validatorHandler)(author_schema_1.getAuthorSchema), (0, validator_handler_1.validatorHandler)(author_schema_1.createUserSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const authorUpdated = yield service.updateAuthor(+id, body);
        res.status(201).json({ data: authorUpdated });
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', (0, validator_handler_1.validatorHandler)(author_schema_1.getAuthorSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const author = yield service.deleteAuthor(+id);
        res.status(200).json({ data: author });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=author.router.js.map