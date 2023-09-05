import Cookies from "js-cookie"

export function setCookieAsync(token:string){
    return new Promise((resolve)=>{
      Cookies.set('authCookie',token, { expires: 30 })
      resolve(null)
    })
}

