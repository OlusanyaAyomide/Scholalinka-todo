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
exports.deleteTodo = exports.UpdateTodo = exports.getTodos = exports.createTodo = void 0;
const todoModel_1 = require("../models/todoModel");
const ResponseHandler_1 = __importDefault(require("../utils/ResponseHandler"));
function createTodo(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const todo = yield todoModel_1.todoModel.create(Object.assign(Object.assign({}, req.body), { user }));
        const todos = yield todoModel_1.todoModel.find({ user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id }).sort({ createdAt: -1 });
        return ResponseHandler_1.default.sendSuccessResponse({ res, data: { todos } });
    });
}
exports.createTodo = createTodo;
function getTodos(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield todoModel_1.todoModel.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).sort({ createdAt: -1 });
        return ResponseHandler_1.default.sendSuccessResponse({ res, data: { user: req.user, todos } });
    });
}
exports.getTodos = getTodos;
function UpdateTodo(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { text, startDate, endDate, dueDate, isCompleted, _id } = req.body;
        const data = yield todoModel_1.todoModel.findByIdAndUpdate(_id, { text, startDate, endDate, dueDate, isCompleted });
        const todos = yield todoModel_1.todoModel.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).sort({ createdAt: -1 });
        return ResponseHandler_1.default.sendSuccessResponse({ res, data: { todos } });
    });
}
exports.UpdateTodo = UpdateTodo;
function deleteTodo(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { _id } = req.body;
        const deletedtodo = yield todoModel_1.todoModel.findByIdAndDelete(_id);
        const todos = yield todoModel_1.todoModel.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).sort({ createdAt: -1 });
        return ResponseHandler_1.default.sendSuccessResponse({ res, data: { todos } });
    });
}
exports.deleteTodo = deleteTodo;
