"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = exports.getAuthorSchema = void 0;
const zod_1 = require("zod");
const id = zod_1.z.number();
const name = zod_1.z.string();
const email = zod_1.z.string().email({ message: 'Write a correct email' });
const role = zod_1.z.string();
exports.getAuthorSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: id.min(1),
    })
});
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: name.min(4, 'First name is too short'),
        lastName: name.min(4, 'Last name is too short'),
    })
});
exports.updateUserSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: id.min(1),
    }),
    body: zod_1.z.object({
        email: email.min(8),
        role: role.min(1)
    })
});
//# sourceMappingURL=author.schema.js.map