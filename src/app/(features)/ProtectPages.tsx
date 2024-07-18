'use client'

import { useEffect, useState } from 'react'
import GlobalLoader from '../components/GlobalLoader'

const ProtectPages = ({ children }) => {
  const [isAppReady,setAppReady] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    setAppReady(true);
  }, [])




  if(isAppReady === undefined) {
    return <GlobalLoader/>
  }


    return <>{children}</>
    
}

export default ProtectPages
