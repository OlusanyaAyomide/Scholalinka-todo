import { ITodo } from '@/store/interface'
import AllContext from '@/store/store'
import { Icons } from '@/utils/Icons'
import React,{useContext} from 'react'
import { Button } from '@/ui/button'
import DateFormatter from '@/utils/DateFormatter'
import DeleteTodo from './DeleteTodo'

//view active todo
export default function TodoView() {
    const {todo:{text,startDate,endDate,dueDate},setIsDrawerOpened,setActiveTask} = useContext(AllContext)
    const dateformatter = new DateFormatter()
  return (
    <div className='pt-2 pb-12 md:pt-4 px-3'>
        <button onClick={()=>{
            setIsDrawerOpened(false)
            setTimeout(()=>{
                setActiveTask("calendar")
            },10)
       
        }} className="block mb-5 md:mb-0 p-1 rounded-full hover:bg-accent ml-auto"><Icons.cancel className='text-lg'/></button>
        <div className=''>
            <h1 className="font-medium mb-3 text-sm">{text}</h1>
            <div className="flex-center mb-3">
                <Icons.calendar className="text-main text-lg mr-2"/>
                <span>{dateformatter.formatDate(dueDate)}</span>
            </div>
            <div className="flex-center">
                <Icons.clock className="text-main mr-2 text-lg"/>
                <h1>
                    <span>{dateformatter.getTruncatedTime(startDate)}</span>
                    <span>{dateformatter.getTruncatedTime(endDate)}</span>
                </h1>
            </div>
            <div className="flex-center mt-10">
                <DeleteTodo/>
                <Button onClick={()=>{setActiveTask("edit")}}
                 className='bg-main grow block text-white hover:bg-blue-500'>
                    Edit
                </Button>
            </div>
        </div>
    </div>
  )
}
