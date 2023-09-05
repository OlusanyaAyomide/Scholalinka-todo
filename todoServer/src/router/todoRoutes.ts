import express from "express"
import { createTodoValidation, deleteTodoValidation } from "../validations/todoValidations"
import { UpdateTodo, createTodo,deleteTodo,getTodos } from "../controllers/todoController"
import { authenticateUser } from "../middlewares/authenticateUser"


const todoRoute = express.Router()

todoRoute.route("/create").post(authenticateUser,createTodoValidation,createTodo)
todoRoute.route("").get(authenticateUser,getTodos)
todoRoute.route("/update").post(authenticateUser,createTodoValidation,UpdateTodo)
todoRoute.route("/delete").post(authenticateUser,deleteTodoValidation,deleteTodo)


export default todoRoute