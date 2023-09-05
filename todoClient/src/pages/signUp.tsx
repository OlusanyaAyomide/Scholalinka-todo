import AuthLayout from '@/components/auth/AutLayout'
import BoardingLayout from '@/components/auth/BoardingLayout'
import InputField from '@/components/auth/InputField'
import { Button } from '@/ui/button'
import { Icons } from '@/utils/Icons'
import {AxiosResponse} from "axios"
import { ISignInResponse } from '@/store/interface'
import RadioLoader from '@/components/utils/RadioLoader'
import Cookies from "js-cookie"
import { setCookieAsync } from '@/utils/requestUtils'
import { useContext, useState } from 'react'
import AllContext from '@/store/store'
import { usePostRequest } from '@/hooks/requestProcessor'
import { signUpRequest as mutationFn } from '@/hooks/requests/endpoints'
import {useFormik} from "formik"
import {  signUpvalidtions } from '@/components/utils/validator'
import { TodoSlicedArray } from '@/lib/utils'

export default function SignUp() {
    const {setUser,setPage,setAllTodo,setPaginatedTodo} = useContext(AllContext)
    const [showpassword,setshowPassword] = useState(false)
    
    const onSuccess = async (res:AxiosResponse<ISignInResponse>)=>{
        const authCookie = Cookies.get("authCookie")
        const {user,token,todos} = res.data?.data

        if (authCookie){
          Cookies.remove("authCookie")
        }

        await setCookieAsync(token)
        const paginatedTodo = TodoSlicedArray(todos,0,7)
        setAllTodo(todos)
        setPaginatedTodo(paginatedTodo)
        setUser(user)
        setPage("todo")
    }

    const formik = useFormik({
        initialValues:{email:"",password:"",name:""},
        validateOnBlur:true,
        validate:signUpvalidtions,
        onSubmit:(value)=>{
            mutate(value)
        }
    })

    const {mutate,isLoading:isloading} = usePostRequest({queryKey:"sign-in",mutationFn,onSuccess})

    return (
    <BoardingLayout>
      <AuthLayout>
        <form className="pad py-8 relative z-20" onSubmit={formik.handleSubmit}>
          <h1 className="text-lg text-main font-semibold text-center pb-4">Welcome Back</h1>
          <div>
            <InputField 
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type='email'
              error={formik.touched.email?formik.errors.email:""}
              text='Email Address'
              placeholder='example@gmail.com'
            />

            <InputField 
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name?formik.errors.name:""}
              text='Name'
              placeholder='johnson'
            />

            <InputField 
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password?formik.errors.password:""}
              text='Password'
              type={showpassword?'text':"password"}
              placeholder='******'
            >
              <button onClick={()=>{setshowPassword((prev=>!prev))}} type='button' className="absolute right-1 bottom-8 text-xl text-main">
                {showpassword?<Icons.eyeDash/>:<Icons.eye/>}
              </button>
            </InputField>

            <Button disabled={isloading} type='submit' className='text-white flex justify-center mt-8 bg-main hover:bg-blue-500 items-center w-full'>{isloading?<RadioLoader/>:"Sign Up"}</Button>

            <button onClick={()=>{setPage("signin")}} className="block w-full hover:underline mt-8 py-1 text-main text-[10px]">Sign In</button>
          </div>
        </form>
      </AuthLayout>

    </BoardingLayout>
  )
}
