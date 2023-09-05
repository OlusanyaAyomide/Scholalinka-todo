import { Icons } from '@/utils/Icons'
import { cn } from '@/lib/utils'
import { ITodos } from '@/store/interface'
import { usePostRequest } from '@/hooks/requestProcessor'
import { updateTodoRequest as mutationFn } from '@/hooks/requests/endpoints'
import { AxiosResponse } from 'axios'
import { INeworEditResponse } from '@/store/interface'
import { useContext } from 'react'
import AllContext from '@/store/store'
import { TodoSlicedArray } from '@/lib/utils' 
import { toast } from '@/ui/use-toast'


interface ISelectBox extends ITodos{
    className?:string
}

//to toggle if a task is completed or uncompleted
export default function SelectBox(item:ISelectBox) {
  
  const {setAllTodo,setPaginatedTodo,setIsDrawerOpened,setNewTodo,theme,currentPage,setCurrentPage} = useContext(AllContext)
  const isDark = theme === "dark"
  const onSuccess = (res:AxiosResponse<INeworEditResponse>)=>{
    const todos = res.data?.data?.todos
    const [ start,end]  = [(currentPage-1)*7, ((currentPage-1)*7)+7]
    const paginatedTodo = TodoSlicedArray(todos,start,end)
    
    setAllTodo(todos)
    setPaginatedTodo(paginatedTodo)
    setIsDrawerOpened(false)
    setNewTodo("")
    toast({
        description:`Todo updated succesfully`,
        className:`border-2 bg-transparent  backdrop-blur-md ${isDark?"text-white":""} h-fit py-2 border-green-500`,
        duration:2000
    })
  }

  const {isLoading,mutate} = usePostRequest({queryKey:"update-status",mutationFn,onSuccess})
  
  const handleChange=()=>{
    const {dueDate,endDate,startDate,text,_id,isCompleted,} = item
    mutate({dueDate,endDate,startDate,text,_id,isCompleted:!isCompleted})
  }
  return (
    <button disabled={isLoading} onClick={handleChange} className={cn(`h-4 bg-background relative shrink-0 w-4 ${!item.isCompleted?"cursor-pointer":""}   rounded-sm grid place-content-center  ${isLoading?"border-none":"border"} ${item.isCompleted?"border-main ":""}`,item.className)}>
        {!isLoading && item.isCompleted && <Icons.check className = "text-main text-lg"/>}
        {isLoading && <div className='h-4 w-4 border-2 rounded-full border-main border-t-transparent border-b-transparent animate-spin'></div>}
    </button>
  )
}
