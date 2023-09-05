import request from "./request"
import {AxiosResponse} from "axios"

interface IAddorEdit{
    text:string, 
    _id?:string 
    startDate:Date
    endDate:Date,
    dueDate:Date,
    isCompleted?:boolean,
}
//request endpoints to custom backend
export const signInRequest = (body:{email:string,password:string})=>{
    return request.post<AxiosResponse<any>>("/user/login",body)
}

export const signUpRequest = (body:{email:string,password:string})=>{
    return request.post<AxiosResponse<any>>("/user/signup",body)
}


export const todoRequest=()=>{
    return request.get<AxiosResponse<any>>("/todo")
}


export const createTodoRequest=(body:IAddorEdit)=>{
    return request.post<AxiosResponse>("/todo/create",body)
}

export const updateTodoRequest=(body:IAddorEdit)=>{
    return request.post<AxiosResponse>("/todo/update",body)
}

export const deleteTodoRequest=(body:{_id:string})=>{
    return request.post<AxiosResponse>("/todo/delete",body)
}