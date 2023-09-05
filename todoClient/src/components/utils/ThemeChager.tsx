import React,{useContext} from 'react'
import { Icons } from '@/utils/Icons'
import { Button } from '@/ui/button'
import AllContext from '@/store/store'

export default function ThemeChanger() {
  const {theme,setTheme} = useContext(AllContext)
  return (
    <Button
      variant={"ghost"} 
      size={"sm"}
      className='w-9 px-0 hover:bg-transparent  fixed top-1 z-40 md:right-0 lg:right-2 right-12 sm:right-16 '
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    > 
      {theme === "light"?<Icons.moon  className="absolute  dark:scale-100  transition-all dark:rotate-0"/>:<Icons.sun className=" scale-100 transition-all text-white dark:-rotate-90 dark:scale-0" />}

    </Button>
  )
}
