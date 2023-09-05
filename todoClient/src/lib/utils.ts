import { ITodos } from "@/store/interface"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const TodoSlicedArray = (array:ITodos[],start:number,end:number)=>{
  const newarray = [...array]
  return newarray.slice(start,end)
}