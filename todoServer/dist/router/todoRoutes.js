"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoValidations_1 = require("../validations/todoValidations");
const todoController_1 = require("../controllers/todoController");
const authenticateUser_1 = require("../middlewares/authenticateUser");
const todoRoute = express_1.default.Router();
todoRoute.route("/create").post(authenticateUser_1.authenticateUser, todoValidations_1.createTodoValidation, todoController_1.createTodo);
todoRoute.route("").get(authenticateUser_1.authenticateUser, todoController_1.getTodos);
todoRoute.route("/update").post(authenticateUser_1.authenticateUser, todoValidations_1.createTodoValidation, todoController_1.UpdateTodo);
todoRoute.route("/delete").post(authenticateUser_1.authenticateUser, todoValidations_1.deleteTodoValidation, todoController_1.deleteTodo);
exports.default = todoRoute;
