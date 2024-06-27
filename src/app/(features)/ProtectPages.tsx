'use client'

import { useEffect, useState } from 'react'
import { isUserLoggedIn } from '../utils/user-session'
import PublicLandingPage from './(public-pages)/#landing/page'

const ProtectPages = ({ children }) => {
  const [isUserLogged, setUserLoggedIn] = useState<boolean>()
  useEffect(() => {
    setUserLoggedIn(isUserLoggedIn())
  }, [])




  if (!isUserLogged) {
    return <PublicLandingPage/>
    
  } else {
    return <>{children}</>
  }
}

export default ProtectPages
