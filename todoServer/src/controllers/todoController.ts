import { IExpressRequest } from "../interfaces/responseInterface";
import { Response,NextFunction } from "express";
import { todoModel } from "../models/todoModel";
import ResponseHandler from "../utils/ResponseHandler";


export async function createTodo(req:IExpressRequest,res:Response,next:NextFunction):Promise<Response|void>{

    const user = req.user?._id
    const todo = await todoModel.create({...req.body,user})

    const todos =  await todoModel.find({user:req.user?._id}).sort({createdAt:-1})
    return ResponseHandler.sendSuccessResponse({res,data:{todos}})
}

export async function getTodos(req:IExpressRequest,res:Response,next:NextFunction):Promise<Response>{

    const todos = await todoModel.find({user:req.user?._id}).sort({createdAt:-1})
    return ResponseHandler.sendSuccessResponse({res,data:{user:req.user,todos}})       

}


export async function UpdateTodo(req:IExpressRequest,res:Response,next:NextFunction):Promise<Response>{
    const {text,startDate,endDate,dueDate,isCompleted,_id} = req.body
    const data = await todoModel.findByIdAndUpdate(_id,{text,startDate,endDate,dueDate,isCompleted})
    const todos =  await todoModel.find({user:req.user?._id}).sort({createdAt:-1})
    return ResponseHandler.sendSuccessResponse({res,data:{todos}})

}

export async function deleteTodo(req:IExpressRequest,res:Response,next:NextFunction):Promise<Response>{
    const {_id} = req.body
    const deletedtodo = await todoModel.findByIdAndDelete(_id)
    const todos =  await todoModel.find({user:req.user?._id}).sort({createdAt:-1})
    return ResponseHandler.sendSuccessResponse({res,data:{todos}})
}