"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookSchema = exports.getBookSchema = void 0;
const zod_1 = require("zod");
const id = zod_1.z.number().nonnegative().int();
const title = zod_1.z.string();
const isFiction = zod_1.z.boolean();
const datePublished = zod_1.z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) {
        return new Date(arg);
    }
    else {
        return console.error('error date');
    }
}, zod_1.z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!"
}).max(new Date(), { message: "Too young!" }));
exports.getBookSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: id.min(1),
    })
});
exports.createBookSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: title.min(4, 'Title is too short'),
        authorId: id.min(1),
        datePublished: datePublished,
        isFiction: isFiction
    })
});
//# sourceMappingURL=book.schema.js.map