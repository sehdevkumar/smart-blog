'use client'

import { useEffect, useState } from 'react'
import { isUserLoggedIn } from '../utils/user-session'

const ProtectPages = ({ children }) => {
  const [isUserLogged, setUserLoggedIn] = useState<boolean>()
  useEffect(() => {
    setUserLoggedIn(isUserLoggedIn())
  }, [])

  if (!isUserLogged) {
    return <>Someting diffrent</>
  } else {
    return <>{children}</>
  }
}

export default ProtectPages
