import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from "@/ui/use-toast"
import { AxiosError } from "axios"
import { useContext } from "react"
import AllContext from "@/store/store"


interface IGetPost{
    queryKey:string
    queryFn:(variables:any) => Promise<any>
    onError?:(data:any)=>void
    onSuccess?:(data:any)=>void
    showError?:boolean,
    staleTime?:number
    retry?:number | boolean
}

interface IFetchPost{
    queryKey:string,
    mutationFn:(variables:any) => Promise<any>
    onSuccess?:(data:any)=>void
    onError?:(data:any)=>void
    showError?:boolean
}





//custom hook for all get requests
export const useGetRequest = ({
    queryKey,queryFn,staleTime=30000,retry=false,onSuccess,onError}:IGetPost)=>{
    return useQuery({
      queryKey:[queryKey],
      staleTime:staleTime,
      refetchOnWindowFocus:false,
      retry:retry,
      queryFn,
      onSuccess,
      onError
      
    }) 
  }

//custom hook for all post request
export const usePostRequest = ({queryKey,mutationFn,onSuccess=()=>{},onError=()=>{},showError=true}:IFetchPost)=>{
    const {theme} = useContext(AllContext)
    const isDark = theme ==="dark"
    const queryclient = useQueryClient()
    return useMutation({
    mutationKey:[queryKey],
      mutationFn:mutationFn,
      onSuccess:(data)=>{
        queryclient.invalidateQueries({queryKey:[queryKey]})
        onSuccess(data)
      },

      onError:(res:AxiosError<any>)=>{
      if (res.code === "ERR_NETWORK"){
          toast({
            title:"Network error",
            description:"Connection is down,try again",
            className:"border-2 bg-background/50 backdrop-sm h-fit py-2 border-red-500"
          })
      }

      if (res.code === "ERR_BAD_REQUEST" && showError){
        const errmsg = res.response?.data?.message
        toast({
          title:"Bad request",
          description:`${errmsg?errmsg:""}`,
          className:`border-2 ${isDark?"text-white":"text-black"} py-2 border-red-500/70 backdrop-blur-sm text-[13px] bg-background/80`,
          duration:3000
        })  
      }
      onError(res)
      }
    })
  }