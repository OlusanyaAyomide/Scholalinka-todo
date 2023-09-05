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
exports.authenticateUser = void 0;
const userModel_1 = require("../models/userModel");
const constants_1 = require("../config/constants");
const ResponseHandler_1 = __importDefault(require("../utils/ResponseHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//authenticate user with token add user to the req object if token is valid
function authenticateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return ResponseHandler_1.default.sendErrorResponse({ res, error: "Token is missing" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, constants_1.JWTSECRET);
        if (!decoded) {
            return ResponseHandler_1.default.sendErrorResponse({ res, error: "Token is Invalid" });
        }
        if (typeof (decoded) !== "string") {
            const user = yield userModel_1.userModel.findById(decoded.id);
            if (user) {
                req.user = user;
            }
            else {
                return ResponseHandler_1.default.sendErrorResponse({ res, error: "Token was not issued" });
            }
        }
        next();
    });
}
exports.authenticateUser = authenticateUser;
