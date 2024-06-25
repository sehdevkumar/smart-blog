'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { ApplicationProvider } from './context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <ApplicationProvider>{children}</ApplicationProvider>
    </ChakraProvider>
  )
}
