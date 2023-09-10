import axios,{InternalAxiosRequestConfig,AxiosResponse, AxiosError, AxiosRequestConfig, AxiosInstance} from "axios"
import Cookies from "js-cookie"


// Intercepting all axios request and adding cookies to headers if it exists
const onRequest=(config:InternalAxiosRequestConfig):InternalAxiosRequestConfig=>{
  const {method,url} = config
  const authCookie = Cookies.get('authCookie')
  if (authCookie){
      config.headers["Authorization"] = `Bearer ${authCookie}`
  }
//   config.headers["Content-Type"] = "application/json"
 
  return config
}
const onResponse = (response:AxiosResponse):AxiosResponse=>{
  const {method,url} = response.config
  const {status} = response
  return response
}

const onErrorResponse = (error:AxiosError|Error):Promise<AxiosError>=>{
  if (axios.isAxiosError(error)){
    const {message} = error
    const {method,url} = error.config as AxiosRequestConfig
    const {statusText,status} = error.response as AxiosResponse ?? {}
    if (status===401){console.log("LogIn Required")}
  }
  return Promise.reject(error)
}

const baseURL ="https://scholalinka-todo.onrender.com/api/v1"
const request = axios.create({
  baseURL,
  headers:{
    "Content-Type":"application/json"
  }
})
request.interceptors.request.use(onRequest,onErrorResponse)
request.interceptors.response.use(onResponse,onErrorResponse)


export default request
