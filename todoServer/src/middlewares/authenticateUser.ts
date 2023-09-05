import { userModel } from "../models/userModel";
import { promisify } from "util";
import { Request,Response,NextFunction } from "express";
import { JWTSECRET } from "../config/constants";
import ResponseHandler from "../utils/ResponseHandler";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { IExpressRequest } from "../interfaces/responseInterface";

//authenticate user with token add user to the req object if token is valid
export async function authenticateUser(req:IExpressRequest,res:Response,next:NextFunction){
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return ResponseHandler.sendErrorResponse({res,error:"Token is missing"})
    }
    const decoded = jwt.verify(token,JWTSECRET)
    if(!decoded){
        return ResponseHandler.sendErrorResponse({res,error:"Token is Invalid"})
    }
    console.log(decoded)
    if(typeof(decoded) !== "string"){
        const user = await userModel.findById(decoded.id);
        if(user){
            req.user = user
            console.log(req.user.email)
        }
        else{
          return ResponseHandler.sendErrorResponse({res,error:"Token was not issued"})
        }
    }
 
    next()
  }