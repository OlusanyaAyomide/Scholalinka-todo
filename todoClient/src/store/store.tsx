import { createContext,useState } from "react"
import useLocalStorage from "use-local-storage"
import { IDateButton } from "./interface"
import { generateDateButtons } from "@/hooks/useDateSelector"
import { ITodos } from "./interface"
import { mockInitial, mockTodos } from "@/utils/constants"
import { IUserInterface } from "./interface"
import { IStoreContext } from "./interface"



const AllContext = createContext<IStoreContext | null>(null)

export const AllContextProvider =({children}:{children:React.ReactNode})=>{
    //control if drawer is opened on mobile
    const [isDrawerOpened,setIsDrawerOpened] = useState<boolean>(false)
    //check active task to be displayed on right bar or mobiel drawer works in conjuction with mulipletstage Compnent
    const [activeTask,setActiveTask] = useState<"create"|"edit"|"view" | "calendar">("calendar")
    const [theme,setTheme] = useLocalStorage<string>("theme","light")

    //used to keep track of date selected in the DateTIme Component
    const [chosenDate, setChosenDate] = useState<Date>(new Date());
    //hold related dates to the chosenDate
    const [dates,setDates] = useState<IDateButton[]>(generateDateButtons(new Date()))

    //holds current todo for viewing,editing and deleting
    const [todo,setTodo] = useState<ITodos>({} as ITodos)

    //keeps track of all todos
    const [allTodo,setAllTodo] = useState<ITodos[]>([])
    //keeps track of paginated todo to be displayed
    const [paginatedTodo,setPaginatedTodo] = useState<ITodos[]>([])

    //current  active page
    const [page,setPage] =useState<"signup"|"signin"|"todo"|"loading">("loading")

    const [user,setUser] = useState<IUserInterface>({} as IUserInterface)
   
    //hold textInput value for creating new Todo
    const [newTodo,setNewTodo] = useState<string>("")

    const [todoDueDate,setTodoDueDate] = useState<Date>(new Date()) 
    const [startDate,setTodoStartDate] = useState<Date>(new Date()) 
    const [endDate,setTodoEndDate] = useState<Date>(new Date()) 
    const [textFocused,setTextFocused] = useState(false)

    //value of current page
    const [currentPage,setCurrentPage] = useState<number>(1)

    const setDate = (newDate: Date) => {
        setChosenDate(newDate)
        const dateList = generateDateButtons(newDate);
        setDates(dateList);
    };

    const context ={
        isDrawerOpened,setIsDrawerOpened,activeTask,setActiveTask,todo,setTodo,user,setUser,currentPage,setCurrentPage,
        page,setPage,newTodo,setNewTodo,todoDueDate,setTodoDueDate,startDate,setTodoStartDate,endDate,setTodoEndDate,
        theme,setTheme,dates,setDate,chosenDate,setChosenDate,allTodo,setAllTodo,paginatedTodo,setPaginatedTodo,textFocused,setTextFocused
      }
    return <AllContext.Provider value={context}>{children}</AllContext.Provider>

}


export default AllContext