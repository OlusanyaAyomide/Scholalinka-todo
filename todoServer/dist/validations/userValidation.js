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
exports.validateUserLogIn = exports.ValidateNewUser = void 0;
const joi_1 = __importDefault(require("joi"));
const ResponseHandler_1 = __importDefault(require("../utils/ResponseHandler"));
function ValidateNewUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object().keys({
            password: joi_1.default.string().required(),
            email: joi_1.default.string().required(),
            name: joi_1.default.string().required()
        });
        const validation = schema.validate(req.body);
        if (validation.error) {
            const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
            return ResponseHandler_1.default.sendErrorResponse({ res, code: 400, error });
        }
        return next();
    });
}
exports.ValidateNewUser = ValidateNewUser;
function validateUserLogIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object().keys({
            email: joi_1.default.string().required(),
            password: joi_1.default.string().required()
        });
        const validation = schema.validate(req.body);
        if (validation.error) {
            const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
            return ResponseHandler_1.default.sendErrorResponse({ res, code: 400, error });
        }
        return next();
    });
}
exports.validateUserLogIn = validateUserLogIn;
