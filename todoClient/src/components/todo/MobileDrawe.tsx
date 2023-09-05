import AllContext from "@/store/store";
import { useContext, useEffect } from "react";
import { Drawer } from "vaul";
import MultipleStages from "./MultipleStages";

//controls mobile drawer on mobile
export function MobileDrawer() {
    const {isDrawerOpened,activeTask,setIsDrawerOpened,textFocused} = useContext(AllContext)
    const {theme} = useContext(AllContext)
    const isDark = theme==="dark"
    console.log("hereee")

    const checkScreenHeight = ()=>{
      console.log(window.innerHeight)
      return window.innerHeight < 300
    }
    const isView = activeTask === "create"
  return (
    <Drawer.Root shouldScaleBackground open={isDrawerOpened}>
      <Drawer.Portal  className="">
        <Drawer.Overlay onClick={()=>{setIsDrawerOpened(false)}}  className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm dark" />
            <Drawer.Content className={`z-40   bottom-0 flex bg-background flex-col rounded-t-2xl ${isView?"h-[380px]":"h-[85%] max-h-[450px] pt-4"} mt-24 fixed bottom-0 ${isDark?"dark":""} left-0 w-full`}>
              <div className={`max-w-[500px] relative
               ${textFocused?checkScreenHeight()?"max-md:top-28":"":""} 
               ${isDark ?"text-white":""} h-[200px] w-full mx-auto sm:border rounded-md`}>
                <MultipleStages/>
              </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
