import {useContext} from "react"
import AllContext from "@/store/store"


export default function DateButtons() {
  const {dates} = useContext(AllContext)
  return (
    <div className="relative  default-scroll flex pb-2">
        {dates.map((item,key)=>(
          <div key={key} className={`${item.isActive?"bg-main text-white":"border"} w-[60px] shrink-0 shadow-[0_0_8px_#0000001f] rounded-md py-3 ${key===0?"":"ml-3"}`}>
              <h1 className="text-center font-medium mb-3">{item.day}</h1>
              <h1 className='text-center font-medium'>{item.date}</h1>
          </div>
        ))}
    </div>
  )
}
