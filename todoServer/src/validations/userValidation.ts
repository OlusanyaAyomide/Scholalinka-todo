import Joi from 'joi';
import { Request,Response,NextFunction } from 'express';
import ResponseHandler from '../utils/ResponseHandler';


export async function ValidateNewUser(
    req:Request,
    res:Response,
    next:NextFunction):Promise<Response | void>{
    const schema =Joi.object().keys({
        password:Joi.string().required(),
        email:Joi.string().required(),
        name:Joi.string().required()
    })
    const validation = schema.validate(req.body);

    if (validation.error) {
        console.log(validation.error.details)
        const error = validation.error.message ? validation.error.message : validation.error.details[0].message;

        return ResponseHandler.sendErrorResponse({ res, code: 400, error });
    }
    return next()
}


export async function validateUserLogIn(
    req:Request,
    res:Response,
    next:NextFunction):Promise<Response | void>{
    const schema = Joi.object().keys({
        email:Joi.string().required(),
        password:Joi.string().required()
    })
    const validation = schema.validate(req.body);

    if (validation.error) {
        const error = validation.error.message ? validation.error.message : validation.error.details[0].message;

        return ResponseHandler.sendErrorResponse({ res, code: 400, error });
    }

    return next()
}