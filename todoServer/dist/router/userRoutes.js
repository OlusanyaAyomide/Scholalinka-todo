"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userValidation_1 = require("../validations/userValidation");
const userController_1 = require("../controllers/userController");
const userRoutes = express_1.default.Router();
userRoutes.route("/signup").post(userValidation_1.ValidateNewUser, userController_1.userSignUp);
userRoutes.route("/login").post(userValidation_1.validateUserLogIn, userController_1.userLogIn);
exports.default = userRoutes;
