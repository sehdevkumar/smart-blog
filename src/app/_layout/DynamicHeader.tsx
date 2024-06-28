'use client'

import { Link } from '@chakra-ui/next-js'
import { useLayoutEffect, useState } from 'react'
import { isUserLoggedIn } from '../utils/user-session'
import SubHeaderAfterLoggedInPage from './SubHeaderAfterLoggedIn'
import SubHeaderBeforeLoggedInPage from './SubHeaderBeforeLoggedIn'

const DynamicHeaderPage = () => {
  const [isUserLoggedin, setUserLoggedIn] = useState<boolean>(false)
  const [isAppReady, setIsAppReady] = useState<boolean | undefined>(undefined)
  useLayoutEffect(() => {
    setIsAppReady(true)
    setUserLoggedIn(isUserLoggedIn())
  }, [])

  if (isAppReady === undefined) {
    return (
       null
    )
  }

  return (
    <div className="flex w-full justify-between">
      <div className="flex-shrink-0 flex items-center">
        <Link href="/home">
          <div className="text-2xl inter font-bold text-gray-900">
            SmartBlog
          </div>
        </Link>
      </div>
      <nav className="flex items-center justify-center gap-x-1">
        <>{isUserLoggedin && <SubHeaderAfterLoggedInPage />}</>

        {!isUserLoggedin && (
          <>
            <SubHeaderBeforeLoggedInPage />
          </>
        )}
      </nav>
    </div>
  )
}

export default DynamicHeaderPage
