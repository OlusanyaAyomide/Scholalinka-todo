import AllContext from '@/store/store'
import DateButtons from '@/components/todo/DateButtons'
import Layout from '@/components/todo/Layout'
import TodoList from '@/components/todo/TodoList'
import { MobileDrawer } from '@/components/todo/MobileDrawe'
import { useScreenSize } from '@/hooks/useScreenSize'
import MultipleStages from '@/components/todo/MultipleStages'
import MobileInput from '@/components/todo/MobileInput'
import DateFormatter from '@/utils/DateFormatter'


export default function Todos() {
    const {isMd} = useScreenSize()
    
    const newDate = new DateFormatter()
  return (
    <Layout>
        <div className="flex mt-5 w-full pb-14 md:pb-5">
            <div className="grow flex min-h-screen flex-wrap md:pr-2 md:border-r">
                <span className="block mb-3 w-full font-semibold">{newDate.getCurrentYearAndMonth()}</span>
                <div className='md:w-[52vw] max-h-[100px] grow w-[90vw] lg:w-[60vw] default-scroll overflow-scroll '>
                    <DateButtons/>
                </div>      
                <TodoList/>  
            </div>
            <div className="w-[320px] shrink-0 h-full max-md:hidden pl-2">
                <div className='fixed overflow-auto h-[80vh] default-scroll'>
                    <div className='h-fit w-[320px] border shadow-[0_0px_16px_#0000004e] rounded-lg'>
                        <MultipleStages/>
                    </div>
                </div>
            </div>
        </div>
        {!isMd && <MobileDrawer/>}
        <MobileInput/>
    </Layout>
  )
}
