import {useContext} from "react"
import { mockTodos } from '@/utils/constants'
import SelectBox from './SelectBox'
import { truncateString } from '@/utils/stringutils'
import AllContext from "@/store/store"
import { ITodos } from "@/store/interface"
import Paginator from "./Paginator"
import DateFormatter from "@/utils/DateFormatter"
import ZeroTodo from "./ZeroTodo"


export default function TodoList() {
  const {setIsDrawerOpened,setTodo,setActiveTask,paginatedTodo,allTodo} = useContext(AllContext)
  const dateFormatter = new DateFormatter()
  const isEmpty = allTodo.length === 0
  const handleView = (item:ITodos)=>{
    setTodo(item)
    setIsDrawerOpened(true)
    setActiveTask("view")
  }

  return (
   <div className='mt-4 text-fade grow'>
    {!isEmpty && <h1 className="font-medium mb-3" id="todo-top">My Tasks</h1>}
    <div className="min-h-[300px]">
      {isEmpty && <div className="h-[300px]">
          <ZeroTodo/>
      </div>}
      {paginatedTodo.map((item,key)=>{
          const due = dateFormatter.formatDate(item.dueDate)
          return <div key={key} className={`rounded-sm justify-between  group border-b mb-5  pad flex-center bg-todo ${!item.isCompleted?"hover:bg-todo-accent":""}`}>
            <div className="flex-center  grow">
              <SelectBox {...item} className='group-hover:bg-background'/>
                <div onClick={()=>{handleView(item)}}
                className={`grow py-3 cursor-pointer px-2 ${item.isCompleted?"opacity-50 decoration-slice":""}`}>
                  <h1 className='font-medium mb-1 text-foreground'>{truncateString(item.text,30)}</h1>
                  <h1 className="text-[11px]">
                    <span>{dateFormatter.getTruncatedTime(item.startDate)}</span>
                    <span className="mx-1">-</span>
                    <span>{dateFormatter.getTruncatedTime(item.endDate)}</span>
                  </h1>   
                </div>
              </div>
              <span>{due}</span>
          </div>
      })}
    </div>
    
    {!isEmpty  && <Paginator/>}
   </div>
  )
}
