import {  } from 'react'
import { useApplicationContext } from '../context'
import { AppEventEnum } from '~/pages/api/api-typings'
import { useToast } from '@chakra-ui/react'

const useHttpClientHandler =()=> {
  const { dispatch } = useApplicationContext()
  const toast = useToast();
  
  const setLoader = 
    (state: boolean, text?: string) => {
      dispatch({ type: AppEventEnum.LOADER, payload: { state, text } })
    }
    

   const setError = 
    (error?: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      dispatch({ type: AppEventEnum.ERROR, payload: error })
    }

    const setToast = (message:string)=> {toast({
      title: `${message}`,
      position: "top",
      isClosable: true,
      variant: "",
      containerStyle: {
        background: "var(--overlay-bg)",
        color: "#f9f9f9",
        borderRadius: "8px",
      },
    });
  }
    

  return { setLoader, setError , setToast}
}

export default  useHttpClientHandler
