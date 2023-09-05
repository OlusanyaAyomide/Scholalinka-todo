import BoardingLayout from '@/components/auth/BoardingLayout'
import { Icons } from '@/utils/Icons'
import { todoRequest as queryFn } from '@/hooks/requests/endpoints'
import React, { useContext } from 'react'
import { useGetRequest } from '@/hooks/requestProcessor'
import AllContext from '@/store/store'
import { AxiosResponse } from 'axios'
import { ISignInResponse } from '@/store/interface'
import { TodoSlicedArray } from '@/lib/utils'


export default function Loader() {
    const {setPage,paginatedTodo,setAllTodo,setPaginatedTodo,setUser} = useContext(AllContext)

    const onSuccess = (res:AxiosResponse<ISignInResponse>)=>{
        const {todos,user} = res.data?.data
        const paginatedTodo = TodoSlicedArray(todos,0,7)
        setAllTodo(todos)
        setPaginatedTodo(paginatedTodo)
        setUser(user)
        setPage("todo")
    }

    const {} = useGetRequest({queryKey:"get-todo",queryFn,onSuccess,onError:()=>{setPage("signin")}})

    return (
    <BoardingLayout>
        <div className="h-screen w-screen flex-center justify-center">
            <div>
                <div className='mb-20'>
                    <h1 className="w-fit mx-auto  mb-3 flex-center animate-pulse">
                        <span className='text-2xl text-main'>Todo App</span>
                        <span className='text-2xl ml-2 text-main'>{<Icons.todo/>}</span>
                    </h1>
                    <div className='rounded-md overflow-hidden w-[200px]'>
                        <div className="animate-loader h-[4px] rounded-md bg-main w-[100px] mx-auto"></div>
                    </div>
                    <h1 className="mt-2 text-center text-main text-[12px] animate-pulse">This might take a while</h1>
                </div>
            </div>
        </div>
    </BoardingLayout>
  )
}
