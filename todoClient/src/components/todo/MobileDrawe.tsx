import AllContext from "@/store/store";
import { useContext } from "react";
import { Drawer } from "vaul";
import MultipleStages from "./MultipleStages";

//controls mobile drawer on mobile
export function MobileDrawer() {
    const {isDrawerOpened,activeTask,setIsDrawerOpened} = useContext(AllContext)
    const {theme} = useContext(AllContext)
    const isDark = theme==="dark"

    const isView = activeTask === "create"
  return (
    <Drawer.Root shouldScaleBackground open={isDrawerOpened}>
      <Drawer.Portal className="">
        <Drawer.Overlay onClick={()=>{setIsDrawerOpened(false)}}  className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm dark" />
            <Drawer.Content className={`z-40  flex bg-background flex-col rounded-t-2xl ${isView?"h-[380px]":"h-[85%] max-h-[450px] pt-4"} mt-24 fixed bottom-0 ${isDark?"dark":""} left-0 w-full`}>
              <div className={`max-w-[500px] ${isDark ?"text-white":""}  w-full mx-auto sm:border rounded-md`}>
                <MultipleStages/>
              </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
