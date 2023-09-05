import { JWTSECRET } from "../config/constants";
import { IExpressRequest } from "../interfaces/responseInterface";
import { Response,NextFunction } from "express";
import { userModel } from "../models/userModel";
import ResponseHandler from "../utils/ResponseHandler";
import jwt from "jsonwebtoken"
import { todoModel } from "../models/todoModel";

export async function userSignUp(req:IExpressRequest,res:Response,next:NextFunction):Promise<Response>{
    const {email} = req.body


    const isExisting = await userModel.findOne({email}) 
    if(isExisting){
        return ResponseHandler.sendErrorResponse({res,code:400,error:"Email Already In use"})
    }
    const newuser = await userModel.create(req.body)
    const user = await userModel.findById(newuser._id)
    console.log(user?.name)
    
    const token = jwt.sign(
        { id: newuser._id, email: newuser.email },
        JWTSECRET,
        { expiresIn:"30d" }
      );
      
      const response = {user:{email:user?.email,_id:user?._id,name:user?.name},token,todos:[]}
    return ResponseHandler.sendSuccessResponse({res,data:response})
}

//signsIn user and  gets all todo associated with the user
export async function userLogIn(req:IExpressRequest,res:Response,next:NextFunction):Promise<Response>{
    const {email,password} = req.body
    console.log(email,password)
    const user = await userModel.findOne({email}).select("password _id name createdAt email")
    if(!user){
        return ResponseHandler.sendErrorResponse({res,error:"Email is invalid"})
    }
    console.log(user.password,user)
    const isPasswordCorrect = await user.checkPassword(password,user.password);
    if(!isPasswordCorrect){
        return ResponseHandler.sendErrorResponse({res,error:"Password is invalid"})
    }
    const todos = await todoModel.find({user:user._id}).sort({createdAt:-1})
    const token = jwt.sign(
        { id: user._id, email: user.email },
        JWTSECRET,
        { expiresIn:"30d" }
      );
    return ResponseHandler.sendSuccessResponse({res,data:{user,token,todos}})
}

