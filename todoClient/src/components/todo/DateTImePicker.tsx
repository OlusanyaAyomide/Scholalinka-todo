import React,{useContext} from 'react'
import { Calendar } from '@/ui/calendar'
import AllContext from '@/store/store'

export default function DateTimePicker() {
  const {chosenDate,setChosenDate,setDate} = useContext(AllContext)

  return (
    <Calendar
      mode="single"
      selected={chosenDate}
      onSelect={(selected)=>{
        if(selected !== chosenDate){
          setChosenDate(selected)
          setDate(selected)
        }
      }}
      className="rounded-md border"
    />
  )
}
