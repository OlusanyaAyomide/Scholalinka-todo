import AllContext from '@/store/store'
import React, { useContext } from 'react'

export default function TodoTextArea() {
    const {newTodo,todo:{text},activeTask,setTodo,setNewTodo,textFocused,setTextFocused} = useContext(AllContext)
    const isEditing = activeTask === "edit"

    //todo input value stored in global state so it can be accessed in parent component
    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        if (isEditing){
            setTodo((prev)=>{return({...prev,text:e.target.value})})
        }
        else{
            setNewTodo(e.target.value)
        }
    }
    return (
    <textarea onFocus={()=>{setTextFocused(true)}} onBlur={()=>{setTextFocused(false)}}
    value={isEditing?text:newTodo} placeholder={text} className='mt-3 py-3 px-2 overflow-auto block w-full default-scroll bg-background rounded-md border outline-none h-[150px] resize-none ' onChange={handleChange}
    ></textarea>
  )
}
