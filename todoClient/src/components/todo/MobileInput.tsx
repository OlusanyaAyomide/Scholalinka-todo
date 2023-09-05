import AllContext from '@/store/store'
import { Icons } from '@/utils/Icons'
import React, { useContext } from 'react'


export default function MobileInput() {
    const {setActiveTask,setIsDrawerOpened} = useContext(AllContext)
  return (
    <div className='pb-3 bg-background md:hidden fixed paddingx w-full bottom-0 left-0'>
        <div className='relative w-full '>
            <input onFocus={()=>{
                setIsDrawerOpened(true)
                setActiveTask("create")}}
             type="text" className='w-full h-10 pad outline-none border rounded-md bg-todo block' placeholder='Input Task'/>
        </div>
        <Icons.mike className = " absolute right-[5%] top-[10px] text-main text-lg"/>
    </div>
  )
}
