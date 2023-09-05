import React, { useState, useEffect } from 'react';

//hoom to check if screen size if tablet
export function useScreenSize(){
    const [screenWidth, setScreenWidth] = useState<null | number>(null)
    useEffect(() => {
        setScreenWidth(window.innerWidth)
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);
    return {
      isMd:screenWidth>768
    }
    
}

