
import { useContext } from 'react'
import Header from './Header'
import { Button } from '@/ui/button'
import AllContext from '@/store/store'
import DateFormatter from '@/utils/DateFormatter'

export default function Layout({children}:{children:React.ReactNode}) {
    const {setActiveTask,user:{name}} = useContext(AllContext)
    const newDate = new DateFormatter()
    return (
    <div  className='pt-14 text-foreground bg-background md:pt-12 paddingx'>
        <Header/>
        <div className="flex justify-between mt-3 sm:mt-4">
            <div>
                <span className='block text-2xl font-semibold'>{newDate.getGreeting()} {name}!</span>
                <span className='mt-1 text-fade'>You got some tasks to do</span>  
            </div>
            <Button onClick={()=>{setActiveTask("create")}}
             className='text-white bg-main flex items-center fixed md:right-6 lg:right-10 hover:bg-blue-500 max-md:hidden px-6'>
                <span className="text-xl mr-2 block mb-[px]">+</span>
                <span>Create New Tasks</span>
            </Button>
         </div>
        <div className='overflow-hidden'>
            {children}
        </div>
 
    </div>
  )
}
