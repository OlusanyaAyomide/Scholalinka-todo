import { NextFunction, Response ,Request} from 'express';


export interface IUserRegister{
    _id:string,
    email:string
    password:string
}


export interface IUser extends IUserRegister{   
}


export interface IExpressRequest extends Request {
    user?:IUser
}

export interface IReqResNext {
    req: IExpressRequest;
    res: Response;
    next: NextFunction;
}
export interface IResponse {
    res: Response;
    code?: number;
    message?: string;
    data?: any;
    custom?: boolean;
}

export interface IResponseError {
    res: Response;
    code?: number;
    error?: string;
    custom?: boolean;
}
