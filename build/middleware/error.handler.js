"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormErrorHandler = exports.boomErrorHandler = exports.errorHandler = exports.logErrors = void 0;
const client_1 = require("@prisma/client");
function logErrors(error, _request, _response, next) {
    console.error(error);
    next(error);
}
exports.logErrors = logErrors;
function errorHandler(err, _req, res, _next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}
exports.errorHandler = errorHandler;
function boomErrorHandler(err, _req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}
exports.boomErrorHandler = boomErrorHandler;
function ormErrorHandler(err, _req, res, next) {
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
            res.status(409).json({
                statusCode: 409,
                message: 'ID not found'
            });
        }
    }
    next(err);
}
exports.ormErrorHandler = ormErrorHandler;
//# sourceMappingURL=error.handler.js.map