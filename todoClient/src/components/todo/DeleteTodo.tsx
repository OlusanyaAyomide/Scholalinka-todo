import React, { useContext, useState } from 'react'
import { Button } from '@/ui/button'
import { AlertDialog,AlertDialogTrigger,AlertDialogCancel,AlertDialogTitle ,AlertDialogContent, AlertDialogDescription, AlertDialogAction} from '@/ui/alert-dialog'
import { deleteTodoRequest as mutationFn } from '@/hooks/requests/endpoints'
import AllContext from '@/store/store'
import { usePostRequest } from '@/hooks/requestProcessor'
import { TodoSlicedArray } from '@/lib/utils' 
import { toast } from '@/ui/use-toast'
import { AxiosResponse } from 'axios'
import { INeworEditResponse } from '@/store/interface'


export default function DeleteTodo() {
    const {todo:{text,_id},theme,setAllTodo,setPaginatedTodo,
    setIsDrawerOpened,setActiveTask,setCurrentPage,currentPage} = useContext(AllContext)
    const [alertOpened,setAlertOpened] = useState(false)
    const {mutate,isLoading} = usePostRequest({queryKey:"delete-todo",mutationFn,onSuccess:(res)=>{onSuccess(res)}})
    const isDark = theme === "dark"
    const PageSize=7
    const onSuccess = (res:AxiosResponse<INeworEditResponse>)=>{
        const todos = res.data?.data?.todos
        const [ start,end]  = [(currentPage-1)*PageSize, ((currentPage-1)*PageSize)+PageSize]
        const paginatedTodo = TodoSlicedArray(todos,start,end)   
        setAllTodo(todos)
        setPaginatedTodo(paginatedTodo)
        setIsDrawerOpened(false)
        setActiveTask("create")
        toast({
            description:`Todo deleted succesfully`,
            className:`border-2 bg-transparent  backdrop-blur-md ${isDark?"text-white":""} h-fit py-2 border-green-500`,
            duration:2000
        })
      }
  return (
    <AlertDialog open={alertOpened}>
        <AlertDialogTrigger asChild>
            <div className='grow mr-3 block'>
                <Button variant='outline' onClick={()=>{setAlertOpened(true)}} className='w-full  block'>Delete</Button>
            </div>
        </AlertDialogTrigger>
        <AlertDialogContent className={`${isDark?"bg-black border-fade text-white":""}`}>
            <div className='relative z-50'>
                <AlertDialogTitle className='text-base'>
                    <span>Delete This Task</span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                    <span>{text}</span>
                </AlertDialogDescription>
                <div className="mt-5 flex-center">
                    <AlertDialogCancel onClick={()=>{setAlertOpened(false)}} className={`mr-1 sm:mr-3 ${isDark?"bg-black border-fade hover:bg-fade text-white hover:text-white":""} cursor-point grow border`}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>{mutate({_id})}} className='bg-main grow ml-1 sm:ml-3 hover:bg-main'>
                        {!isLoading && <span>Delete</span>}
                        {isLoading && <div className='h-4 w-4 border-2 rounded-full border-white border-t-transparent border-b-transparent animate-spin'></div>}
                    </AlertDialogAction>
                </div>
            </div>

        </AlertDialogContent>
    </AlertDialog>

  )
}
