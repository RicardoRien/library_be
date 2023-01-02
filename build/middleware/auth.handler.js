"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = exports.checkApiKey = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const config_1 = __importDefault(require("../config/config"));
function checkApiKey(req, _res, next) {
    const apiKey = req.headers['api'];
    if (apiKey === config_1.default.apiKey) {
        next();
    }
    else {
        next(boom_1.default.unauthorized());
    }
}
exports.checkApiKey = checkApiKey;
// Here check roles. Use in service as middleware
function checkRoles(...roles) {
    return (req, _res, next) => {
        console.log('Look at role: ', req.user);
        const user = req.user;
        console.log(roles);
        if (roles.includes(user.role)) {
            next();
        }
        else {
            next(boom_1.default.forbidden('You do not have the required permissions to access.'));
        }
    };
}
exports.checkRoles = checkRoles;
//# sourceMappingURL=auth.handler.js.map