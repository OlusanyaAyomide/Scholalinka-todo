import { IFormField } from "@/store/interface";

//signIn valdation
export const authValidations=({email,password}:IFormField)=>{
    const errors = {} as IFormField 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isEmailValid = emailRegex.test(email)
    errors.email = !email?"Email field is required":!isEmailValid?"Email is not valid":""
    errors.password =!password?"Password fieid is required":""
    
    if (!(errors.email ==="" && errors.password === "")){
        return errors
    }

}

//signupValidation
export const signUpvalidtions=({email,password,name}:IFormField)=>{
    const errors = {} as IFormField 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isEmailValid = emailRegex.test(email)
    errors.name =!name?"Name fieid is required":""
    errors.email = !email?"Email field is required":!isEmailValid?"Email is not valid":""
    errors.password =!password?"Password fieid is required":""
    
    if (!(errors.email ==="" && errors.password === "")){
        return errors
    }

}

