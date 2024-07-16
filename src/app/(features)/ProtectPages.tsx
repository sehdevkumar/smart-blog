'use client'

import { useEffect, useState } from 'react'
import { isUserLoggedIn } from '../utils/user-session'
import PublicLandingPage from './(public-pages)/public-landing/page'
import GlobalLoader from '../components/GlobalLoader'

const ProtectPages = ({ children }) => {
  const [isUserLogged, setUserLoggedIn] = useState<boolean>()
  const [isAppReady,setAppReady] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    setAppReady(true);
    setUserLoggedIn(isUserLoggedIn())
  }, [])




  if(isAppReady === undefined) {
    return <GlobalLoader/>
  }

  if (!isUserLogged) {
    return <PublicLandingPage/>
    
  } else {
    return <>{children}</>
  }
}

export default ProtectPages
