import {useContext, useState} from "react"
import { format } from 'date-fns';
import { Popover, PopoverContent } from "@/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Icons } from "@/utils/Icons";
import dayjs from "dayjs";
import {TimePicker} from "antd"
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { Calendar } from "@/ui/calendar";
import AllContext from "@/store/store";


export default function EditTimePicker() {
  const [isDayOpen,setIsDayOpen] = useState<boolean>(false)
  const {todoDueDate,setTodoDueDate,startDate,setTodoStartDate,theme,
      endDate,setTodoEndDate} =useContext(AllContext)


  return (
    <div className="flex-center mt-4 justify-between">
      <Popover open={isDayOpen}>
          <PopoverTrigger asChild>
              <div onClick={()=>{setIsDayOpen((prev=>!prev))}} className="flex-center whitespace-nowrap overflow-hidden border  cursor-pointer w-[90px] text-fade py-[6px] px-1 rounded-md">
                <Icons.calendar className="text-lg mr-[2px]"/>
                <span className="">
                  {todoDueDate?format(todoDueDate,'PP'):"Today"}
                </span>
              </div>
          </PopoverTrigger>
          
          <PopoverContent  className={`w-[320px] relative ${theme==="dark"?"text-white border-fade bg-black":""}`}>
            <button className="p-1 absolute top-1 right-1 text-sm" onClick={()=>{
                setIsDayOpen(false)
            }}><Icons.cancel/></button>
              <Calendar
                mode="single"
                className={`rounded-md`}
                selected={todoDueDate}
                onSelect={(date)=>{
                  if(date !== todoDueDate){
                    setTodoDueDate(date)
                    setIsDayOpen(false)
                  }
                }}/>
          </PopoverContent>
      </Popover>

      <TimePicker 
        value={dayjs(startDate)}
        onSelect={(date)=>{
          
          setTodoStartDate(date.toDate())
        }}
       className="w-[90px] border-border"
        />

      <TimePicker 
        value={dayjs(endDate)}
        onSelect={(date)=>{
          setTodoEndDate(date.toDate())
        }}
        className="w-[90px]"
        />

    </div>

  )
}