import AllContext from '@/store/store'
import DateTimePicker from './DateTImePicker'
import React, { useContext } from 'react'
import TodoView from './TodoView'
import EditOrAddTodo from './EditorAddTodo'

//used to navigate between components on right-side-bar on desktop and drawer on mobile
export default function MultipleStages() {
  const {activeTask} = useContext(AllContext)
  return (
    <>
      {activeTask === "calendar"?<DateTimePicker/>:
      activeTask ==="view"?<TodoView/>:activeTask==="edit"?
      <EditOrAddTodo/>:<EditOrAddTodo/>
      }
    </>
  )
}
