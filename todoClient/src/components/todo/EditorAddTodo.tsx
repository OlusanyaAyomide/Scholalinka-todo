import AllContext from '@/store/store'
import React,{useContext} from 'react'
import { Icons } from '@/utils/Icons' 
import EditTimePicker from './EditTimePicker'
import { Button } from '@/ui/button'
import TodoTextArea from './TodoTextArea'
import { usePostRequest } from '@/hooks/requestProcessor'
import { createTodoRequest ,updateTodoRequest} from '@/hooks/requests/endpoints'
import { toast } from '@/ui/use-toast'
import RadioLoader from '../utils/RadioLoader'
import { AxiosResponse } from 'axios'
import { INeworEditResponse } from '@/store/interface'
import { TodoSlicedArray } from '@/lib/utils'

export default function EditOrAddTodo() {
    const {setIsDrawerOpened,setActiveTask,activeTask,setAllTodo,
        setPaginatedTodo,theme,setNewTodo,currentPage,setCurrentPage,
        todoDueDate:dueDate,startDate,endDate,todo:{text,_id},newTodo} = useContext(AllContext)

    const isAdding = activeTask === "create"
    const isDark = theme === "dark"

    const {mutate,isLoading} = usePostRequest({queryKey:"add-todo",mutationFn:isAdding?createTodoRequest:updateTodoRequest,onSuccess:(d)=>{onSuccess(d)}})
    
    const onSuccess =(res:AxiosResponse<INeworEditResponse>)=>{
        const todos = res.data?.data?.todos
        const newPage = isAdding?1:currentPage
        const [ start,end]  = [(newPage-1)*7, ((newPage-1)*7)+7]
        const paginatedTodo = TodoSlicedArray(todos,start,end)
        setAllTodo(todos)
        setPaginatedTodo(paginatedTodo)
        setIsDrawerOpened(false)
        setCurrentPage(newPage)
        setNewTodo("")
        toast({
            description:`Todo ${isAdding?"added":"updated"} succesfully`,
            className:`border-2 bg-background/50 backdrop-sm ${isDark?"text-white":""} h-fit py-2 border-green-500`,
            duration:2000
        })
    }

    const handleSubmit =()=>{
        const todotext = isAdding?newTodo:text
        if(!todotext){
            return toast({
                description:"Text filed in empty",
                className:`border-2 bg-background/50 backdrop-sm ${isDark?"text-white":""} h-fit py-2 border-red-500`
              })
        }
        mutate({text:todotext,startDate,endDate,dueDate,_id:!isAdding?_id:null})
 
    }

    return (
    <div className='pt-2 pb-12 md:pt-4 px-3  '>
        <div className="flex-center justify-between">
            <span className="font-semibold text-sm">{isAdding?"Add":"Edit"} Task</span>
            <button onClick={()=>{
                setIsDrawerOpened(false)
                setTimeout(()=>{
                    setActiveTask("calendar")
                },10)
        }} className="block mb-5 md:mb-2 p-1 rounded-full hover:bg-accent ml-auto"><Icons.cancel className='text-lg text-fade'/></button>
        </div>  

        <TodoTextArea/>
        <EditTimePicker/>   

        <div className="mt-10 flex-center">
            <Button variant='outline' disabled={isLoading} onClick={()=>{
                setIsDrawerOpened(false);
                setActiveTask("calendar")}}
             className='grow mr-3 block'>Cancel</Button>
            <Button disabled={isLoading} className='bg-main grow flex items-center justify-center text-white hover:bg-blue-500' onClick={handleSubmit}>
                {isLoading?<RadioLoader/>: <span>{isAdding?"Add":"Edit"}</span>}
            </Button>

        </div>  
    </div>
  )
}
