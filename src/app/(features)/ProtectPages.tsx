'use client'

import { useEffect, useState } from 'react'
import GlobalLoader from '../components/GlobalLoader'

const ProtectPages = ({ children }) => {
  const [isAppReady, setAppReady] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    setAppReady(true);
  }, [])




  if (isAppReady === undefined) {
    return <GlobalLoader />
  }


  return <div className='grid overflow-x-hidden overflow-y-auto w-full h-full bg-[var(--app-bg)]'>{children}</div>

}

export default ProtectPages
