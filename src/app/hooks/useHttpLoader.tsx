import {  } from 'react'
import { useApplicationContext } from '../context'
import { AppEventEnum } from '~/pages/api/api-typings'

const useHttpClientHandler =()=> {
  const { dispatch } = useApplicationContext()

  const setLoader = 
    (state: boolean, text?: string) => {
      dispatch({ type: AppEventEnum.LOADER, payload: { state, text } })
    }
    

   const setError = 
    (error?: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      dispatch({ type: AppEventEnum.ERROR, payload: error })
    }
    

  return { setLoader, setError }
}

export default  useHttpClientHandler
