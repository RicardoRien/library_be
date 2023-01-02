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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorHandler = exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema, property) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parseAsync(req[property]);
        return next();
    }
    catch (error) {
        let err = error;
        if (err instanceof zod_1.z.ZodError) {
            err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
        }
        return res.status(409).json({
            status: 'failed',
            error: err,
        });
    }
});
exports.validate = validate;
const validatorHandler = (schema) => (req, res, next) => {
    const params = Object.assign({}, req.params);
    if (params.id) {
        params.id = +params.id;
    }
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params
        });
        return next();
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            console.log('> > > req.query: ', err);
            return res.status(400).json(err.issues.map(issue => ({
                path: issue.path,
                message: issue.message,
            })));
        }
        else {
            return res.status(400);
        }
    }
};
exports.validatorHandler = validatorHandler;
//# sourceMappingURL=validator.handler.js.map