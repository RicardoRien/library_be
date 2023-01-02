"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_router_1 = __importDefault(require("./author.router"));
const book_router_1 = __importDefault(require("./book.router"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use('/api/v1', router);
    router.use('/authors', author_router_1.default);
    router.use('/books', book_router_1.default);
}
exports.default = routerApi;
//# sourceMappingURL=index.js.map