import { Icons } from '@/utils/Icons'
import UserAvatar from '../utils/UserAvatar'
import { Button } from '@/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/ui/sheet'
import { useContext, useState } from 'react'
import AllContext from '@/store/store'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import UserProfile from './UserProfile'

export default function Header() {
    const {theme} = useContext(AllContext)
    const [isOpen,setIsOpen] = useState(false)
  return (
    <header className="fixed left-0 z-40 paddingx shadow-sm top-0 w-full bg-background py-1 md:py-2 flex-center justify-between border-b">
        <span className="text-xl font-semibold">ToDo</span>
        <div className="max-md:hidden flex-center text-fade">
            <Icons.setting className = "mr-4 text-xl"/>
            <Icons.notification className ="mr-4 text-xl"/>
            <div className="flex">
                <UserAvatar/>
                <Popover onOpenChange={(state)=>{setIsOpen(state)}}>
                    <PopoverTrigger asChild>
                        <button  className={`text-xl ml-2  p-2 ${isOpen?"rotate-180":""} transition-all`}>
                            <Icons.angleDown className = "text-base text-fade"/>
                        </button>
                    </PopoverTrigger>
     
                    <PopoverContent className={`p-0 ${theme==="dark"?"dark":""} pad bg-background`} onFocusOutside={()=>{setIsOpen(false)}} >
                        <UserProfile/>
                    </PopoverContent>
                </Popover>
              
            </div>
            
        </div>
        <Sheet>
            <SheetTrigger className='md:hidden' asChild>
                <Button variant='ghost' size='icon'>
                    <Icons.menu className = "text-xl"/>
                </Button>
            </SheetTrigger>
            <SheetContent side='right' className={`${theme==="dark"?"dark":""} px-0`}>
                <UserProfile/>
            </SheetContent>
        </Sheet>
    </header>
  )
}
