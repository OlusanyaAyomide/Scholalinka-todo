import React, { useContext } from 'react'
import UserAvatar from '../utils/UserAvatar'
import AllContext from '@/store/store'
import { Icons } from '@/utils/Icons'
import { Button } from '@/ui/button'

import Cookies from 'js-cookie'

export default function UserProfile() {
    const {user:{name},allTodo,theme,setTheme,setPage} = useContext(AllContext)
    const isDark = theme === "dark"
    return (
    <div className={`py-4 ${isDark?"text-white":""} `}>
        <h1 className="text-center text-main font-semibold text-2xl md:hidden mb-8">TodoApp</h1>
        <div className="flex-center md:hidden pad mb-5">
            <UserAvatar/>
            <span className="font-medium ml-2">{name}</span>
        </div>
        <div className="flex-center hover:bg-accent py-3 pad">
            <Icons.todo className = "text-xl mr-4 text-main"/>
            <span>{allTodo.length} task created</span>
        </div>
        <div className='flex-center cursor-pointer py-1 hover:bg-accent' onClick={()=>{
            setTheme(theme === "light" ? "dark" : "light")}}>
            <Button className='mr-2' size='icon' variant='ghost' >
                {isDark?<Icons.sun className ="text-xl text-main"/>:<Icons.moon className ="text-xl text-main"/>}
            </Button>
            <span>Switch to {isDark?"light":"dark"} mode</span>
        </div>
        <div className='flex-center cursor-pointer py-1 pad hover:bg-accent' onClick={()=>{
                Cookies.remove("authCookie");
                setPage("signin");
            }}>
            <Button className='mr-2 -ml-[10px]' size='icon'  variant='ghost'>
                <Icons.logout className ="text-2xl text-main"/>
            </Button>
            <span>logout</span>
        </div>
    </div>
  )
}
