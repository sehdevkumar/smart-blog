"use client";
import { useEffect, useState } from 'react';

const useDeviceType = () => {
  

 
 
  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };
     if(typeof window !=='undefined'){
       window?.addEventListener('resize', handleResize);
       
       return () => {
         window?.removeEventListener('resize', handleResize);
       };
     }

  }, []);

  return deviceType;
};

const getDeviceType = () => 
  {

  if(typeof window !=='undefined'){ 
    const width = window?.innerWidth;
  
    if (width < 640) {
      return 'mobile';
    } else if (width >= 640 && width < 1024) {
      return 'tablet';
    } else if (width >= 1024 && width < 1280) {
      return 'laptop';
    } else if (width >= 1280 && width < 1920) {
      return 'desktop';
    } else {
      return 'large-screen';
    }
  }  
};

export default useDeviceType
