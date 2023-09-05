import express from "express"
import { ValidateNewUser,validateUserLogIn } from "../validations/userValidation"
import { userLogIn, userSignUp } from "../controllers/userController"


const userRoutes = express.Router()

userRoutes.route("/signup").post(ValidateNewUser,userSignUp)
userRoutes.route("/login").post(validateUserLogIn,userLogIn)



export default userRoutes