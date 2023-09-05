import { cn } from '@/lib/utils'
import AllContext from '@/store/store'
import React, { useContext } from 'react'

interface IFieldButton{
    text:string
    error:string
    placeholder:string
    type?:"text"|"email"|"password"
    children?:React.ReactNode
    className?:string
    name:string
    value:string
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
    onBlur:(e?:React.FocusEvent<HTMLInputElement>)=>void


}

export default function InputFiled({children,value,name,onBlur,onChange,text,error,placeholder,type="text",className}:IFieldButton) {
  const {theme} = useContext(AllContext)
  return (
    <div  className={cn(`relative pb-5 ${theme ==="dark"?"text-white":""}`,className)}>
        <span className="block text-ain font-medium mb-2">{text}</span>
        <input onBlur={onBlur} onChange={onChange} value={value} type={type} name={name} className={`h-10 rounded-lg text-foreground dark:bg-[#303131] bg-[#F1F5F9] focus-visible:shadow-[0_0_12px_#0000001f] ${error?"border-red-500/30 border":""} dark:focus-visible:shadow-[#ffffff2f] px-2 outline-none w-full block`} placeholder={placeholder}  />
        {children}
        {error && <span className='absolute bottom-1 text-red-500  left-2 text-xs'>{error}</span>}
    </div>
  )
}
