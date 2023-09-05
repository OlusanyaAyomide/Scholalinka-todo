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
exports.userLogIn = exports.userSignUp = void 0;
const constants_1 = require("../config/constants");
const userModel_1 = require("../models/userModel");
const ResponseHandler_1 = __importDefault(require("../utils/ResponseHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const todoModel_1 = require("../models/todoModel");
function userSignUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        const isExisting = yield userModel_1.userModel.findOne({ email });
        if (isExisting) {
            return ResponseHandler_1.default.sendErrorResponse({ res, code: 400, error: "Email Already In use" });
        }
        const newuser = yield userModel_1.userModel.create(req.body);
        const user = yield userModel_1.userModel.findById(newuser._id);
        const token = jsonwebtoken_1.default.sign({ id: newuser._id, email: newuser.email }, constants_1.JWTSECRET, { expiresIn: "30d" });
        const response = { user: { email: user === null || user === void 0 ? void 0 : user.email, _id: user === null || user === void 0 ? void 0 : user._id, name: user === null || user === void 0 ? void 0 : user.name }, token, todos: [] };
        return ResponseHandler_1.default.sendSuccessResponse({ res, data: response });
    });
}
exports.userSignUp = userSignUp;
//signsIn user and  gets all todo associated with the user
function userLogIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield userModel_1.userModel.findOne({ email }).select("password _id name createdAt email");
        if (!user) {
            return ResponseHandler_1.default.sendErrorResponse({ res, error: "Email is invalid" });
        }
        const isPasswordCorrect = yield user.checkPassword(password, user.password);
        if (!isPasswordCorrect) {
            return ResponseHandler_1.default.sendErrorResponse({ res, error: "Password is invalid" });
        }
        const todos = yield todoModel_1.todoModel.find({ user: user._id }).sort({ createdAt: -1 });
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, constants_1.JWTSECRET, { expiresIn: "30d" });
        return ResponseHandler_1.default.sendSuccessResponse({ res, data: { user, token, todos } });
    });
}
exports.userLogIn = userLogIn;
