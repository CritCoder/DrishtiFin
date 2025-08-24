"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 1920, // Default size to prevent initial 0x0
    height: 1080,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
};

export const UnicornHeroBackground = () => {
  const { width, height } = useWindowSize();

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden")} style={{ zIndex: 1 }}>
      <UnicornScene 
        production={true} 
        projectId="cbmTT38A0CcuYxeiyj5H" 
        width={width || window.innerWidth} 
        height={height || window.innerHeight}
        style={{ width: '100%', height: '100%', minHeight: '100vh' }}
      />
    </div>
  );
};