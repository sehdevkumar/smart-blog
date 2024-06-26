'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { ApplicationProvider } from './context'
import { isUserLoggedIn } from './utils/user-session'

export function Providers({ children }: { children: React.ReactNode }) {
  
  
  if(!isUserLoggedIn()) {
     console.log("User not logged in")
  }



  return (
    <ChakraProvider>
      <ApplicationProvider>{children}</ApplicationProvider>
    </ChakraProvider>
  )
}
