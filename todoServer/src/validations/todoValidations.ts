import Joi from 'joi';
import { Request,Response,NextFunction } from 'express';
import ResponseHandler from '../utils/ResponseHandler';


export async function createTodoValidation(
    req:Request,
    res:Response,
    next:NextFunction):Promise<Response | void>{
    const schema =Joi.object().keys({
        text:Joi.string().required(), 
        _id:Joi.string().optional().allow(null),  
        startDate:Joi.date().required(),
        endDate:Joi.date().required(),
        dueDate:Joi.date().required(),
        isCompleted:Joi.boolean().optional(),
    })
    const validation = schema.validate(req.body);

    if (validation.error) {
        console.log(validation.error.details)
        const error = validation.error.message ? validation.error.message : validation.error.details[0].message;

        return ResponseHandler.sendErrorResponse({ res, code: 400, error });
    }
    return next()
}



export async function deleteTodoValidation(
    req:Request,
    res:Response,
    next:NextFunction):Promise<Response | void>{
    const schema =Joi.object().keys({
        _id:Joi.string().required()  
    })
    const validation = schema.validate(req.body);
    
    if (validation.error) {
        console.log(validation.error.details)
        const error = validation.error.message ? validation.error.message : validation.error.details[0].message;

        return ResponseHandler.sendErrorResponse({ res, code: 400, error });
    }
    return next()
}