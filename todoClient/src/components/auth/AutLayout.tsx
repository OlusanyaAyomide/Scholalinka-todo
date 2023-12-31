import React from 'react'


export default function AuthLayout({children}:{children:React.ReactNode}) {

    return (
        <div className='min-h-screen w-screen relative z-10 paddingx md:flex md:items-center max-md:pt-8 overflow-hidden'>
            <div className="fixed h-32 z-10 w-32 rounded-full -right-10 -top-12 bg-main opacity-30"></div>
            <div className='md:w-full relative z-30'>
                <h1 className="text-center text-main font-bold text-2xl pb-10 uppercase">MyTodoApp</h1>
                <div className="md:flex md:pr-12 lg:pr-20 md:justify-center  w-full md:items-center max-w-[850px] mx-auto">
                   <div className='max-md:hidden flex justify-center  grow '>
                        <img src="/signin.svg" className='w-full h-full mr-8 max-w-[350px]' alt="svgLogo" />
                   </div>
                   <div className='w-full  max-w-[420px] backdrop-blur-[2px]  backdrop-filter shadow-[0_0_16px_#0000001f] dark:shadow-[0_0_16px_#ffffff1f]  mx-auto md:w-6/12 min-h-[320px]  rounded-lg'>
                    {children}
                   </div>
                </div>
            </div>
        </div>        

  )
}
