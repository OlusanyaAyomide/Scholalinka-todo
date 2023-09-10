import React, { useContext, useState } from 'react'
import { usePagination } from '@/hooks/usePagination'
import { Icons } from '@/utils/Icons'
import {Link} from "react-scroll"


export default function Paginator() { 
    const {paginationRange,handleChange,currentPage,isbackDisabled} = usePagination()

    return (
    <div className='mt-8 border-t max-md:max-w-[90vw] default-scroll overflow-auto pt-6 flex-center justify-between'>

        <Link duration={300} smooth offset={-50} to="todo-top">
            <button 
                onClick={()=>{handleChange({currentPage:currentPage-1})}} 
                disabled={currentPage===1}  className='disabled:opacity-40 flex-center mr-2'>
                <Icons.back className={`text-lg mr-1 ${currentPage===1?"opacity-40":""}`}/>
                <span>Prev</span>
                <span className='max-md:hidden'>ious</span>
               
            </button>
        </Link>

        <div className='flex'>
            {paginationRange?.map((item,key)=>{
            const isActive = item === currentPage
            const isDot = typeof(item) === "string"
            if(isDot){
                return <span key={key} className='text-lg mr-3'>...</span>
            }
            return(
            <Link duration={300} key={key} smooth offset={-50} to="todo-top">
                <button onClick={()=>{handleChange({currentPage:item})}} key={key} className={`h-7 w-7 grid place-content-center ${isActive?"bg-todo-accent":""} w-4 mr-1 sm:mr-3 rounded-full`}>  
                {item} 
                </button>
            </Link> 
            )
        })}
        </div>
        
        <Link duration={300} smooth offset={-50} to="todo-top">
            <button onClick={()=>{handleChange({currentPage:currentPage+1})}} 
                disabled={isbackDisabled}
                className='disabled:opacity-40 flex-center'>
                <span>Next</span>
                <Icons.back className={`text-lg ml-1 ${isbackDisabled?"opacity-40":""} rotate-180`} />
            </button>
        </Link>

           
    </div>
  )
}
