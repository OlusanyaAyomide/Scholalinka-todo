export interface IDateButton {
  day: string;
  date: number;
  isActive: boolean;
}


export interface ITodo{
  text:string
  createdAt:string   
  duration?:string
  isCompleted?:boolean
}

export interface IUserInterface{
  email:string
  name:string
}

export interface ITodos {
  _id: string;
  text: string;
  startDate: string;
  endDate: string;
  dueDate: string;
  isCompleted: boolean;
  createdAt: string;
}

interface IUser{
  _id: string;
  email: string;
  createdAt: string;
  name:string
};

export interface ISignInResponse{
  success: boolean;
  code: number;
  message: string;
  data: {
    user: IUser
    token: string;
    todos:ITodos[];
  };

}


export interface IFormField{
  email:string,
  password:string
  name?:string
}


export interface INeworEditResponse{
  success: boolean;
  code: number;
  message: string;
  data: {
    todos:ITodos[];
  };

}
export interface IStoreContext{
  isDrawerOpened:boolean
  setIsDrawerOpened:React.Dispatch<React.SetStateAction<boolean>>
  activeTask:"create"|"edit"|"view" | "calendar"
  setActiveTask:React.Dispatch<React.SetStateAction<"create"|"edit"|"view" | "calendar">>
  theme:string
  dates:IDateButton[]

  //used instead of router to set pages
  page:"signup"|"signin"|"todo"|"loading"
  setPage:React.Dispatch<React.SetStateAction<"signup"|"signin"|"todo">>
  setDate:(date:Date)=>void
  setTheme:(theme:string)=>void
  chosenDate:Date
  paginatedTodo:ITodos[]
  user:IUserInterface
  setUser:React.Dispatch<React.SetStateAction<IUserInterface>>
  allTodo:ITodos[]
  setAllTodo:React.Dispatch<React.SetStateAction<ITodos[]>>
  setPaginatedTodo:React.Dispatch<React.SetStateAction<ITodos[]>>
  setChosenDate:React.Dispatch<React.SetStateAction<Date>>
  todo:ITodos
  setTodo:React.Dispatch<React.SetStateAction<ITodos>>

  //states to keep track of new todo / todos being eddited
  newTodo:string
  setNewTodo:React.Dispatch<React.SetStateAction<string>> 
  todoDueDate:Date
  setTodoDueDate:React.Dispatch<React.SetStateAction<Date>> 
  startDate:Date
  setTodoStartDate:React.Dispatch<React.SetStateAction<Date>> 
  endDate:Date
  setTodoEndDate:React.Dispatch<React.SetStateAction<Date>> 

  currentPage:number
  setCurrentPage:React.Dispatch<React.SetStateAction<number>> 
  textFocused:boolean
  setTextFocused:React.Dispatch<React.SetStateAction<boolean>>


}
