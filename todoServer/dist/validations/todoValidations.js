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
exports.deleteTodoValidation = exports.createTodoValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const ResponseHandler_1 = __importDefault(require("../utils/ResponseHandler"));
function createTodoValidation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object().keys({
            text: joi_1.default.string().required(),
            _id: joi_1.default.string().optional().allow(null),
            startDate: joi_1.default.date().required(),
            endDate: joi_1.default.date().required(),
            dueDate: joi_1.default.date().required(),
            isCompleted: joi_1.default.boolean().optional(),
        });
        const validation = schema.validate(req.body);
        if (validation.error) {
            const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
            return ResponseHandler_1.default.sendErrorResponse({ res, code: 400, error });
        }
        return next();
    });
}
exports.createTodoValidation = createTodoValidation;
function deleteTodoValidation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object().keys({
            _id: joi_1.default.string().required()
        });
        const validation = schema.validate(req.body);
        if (validation.error) {
            const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
            return ResponseHandler_1.default.sendErrorResponse({ res, code: 400, error });
        }
        return next();
    });
}
exports.deleteTodoValidation = deleteTodoValidation;
