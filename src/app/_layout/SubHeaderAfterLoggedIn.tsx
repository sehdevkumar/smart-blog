import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AppPathEnums } from '../typings/app-typings'
import { EditIcon } from '../components/Icons'
import { Button } from '../components/ChakraUI'
import {
  Avatar,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { getToken, getUserInfo, removeUserSession } from '../utils/user-session'
import axios, { type AxiosResponse } from 'axios'
import { useMutation } from '@tanstack/react-query'
import useHttpClientHandler from '../hooks/useHttpLoader'

const SubHeaderAfterLoggedInPage = () => {
  const routeName = usePathname()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<{ email: string; name: string }>()

  const [isWritePage, setWritePage] = useState<boolean>(false)
  const [isDefaultPages, setDefaultPages] = useState<boolean>(false)
  const  {setLoader,setError,setToast} = useHttpClientHandler()


  
   const logoutUserFn = async (): Promise<AxiosResponse<any,any>>=> {
    const payload = {
      token:getToken()
    }
    return await axios.post('/api/auth/logout',payload);

  }

  
  const startLogoutMutation = useMutation({
    mutationFn: () => logoutUserFn(),
    onSuccess: (startResponse) => {
      if ([204, 201].includes(startResponse.status)) {
        setToast('User Logged Out Successfully...')
        setLoader(true,'redirecting....')
        removeUserSession();
        const ref =  setTimeout(()=> {
          router.push('/login')
          clearTimeout(ref);
          setLoader(false);
         },2000)
      }
    },
    onError: (err) => {
      setLoader(false);
      setError(err);
      console.log("error", err);
    },
  });
  

  const logOutHandler = ()=> {
      startLogoutMutation.mutate()
  }


  useEffect(() => {
    if (routeName === AppPathEnums.WRITE_POST) {
      setWritePage(true)
      setDefaultPages(false)
    } else {
      setWritePage(false)
      setDefaultPages(true)
    }
  }, [routeName])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setUserInfo(getUserInfo() as any)
  }, [])



  return (
    <div className="flex flex-row gap-x-2 items-center justify-between">
      {isDefaultPages && (
        <Button
          onClick={() => {
            router.push(AppPathEnums.WRITE_POST)
          }}
          className="flex justify-center items-center"
        >
          <EditIcon />
          <div className="text-gray-900 hover:text-gray-700 px-2 py-2 rounded-md text-sm font-medium">
            Write
          </div>
        </Button>
      )}

      {isWritePage && (
        <>
          <Button
            style={{
              background: 'var(--app-btn-bg)',
              color: 'var(--app-btn-text)',
            }}
          >
            <EditIcon />
            <div className="text-[var(--app-btn-text)] hover:text-gray-700 px-2 py-2 rounded-md text-sm font-medium">
              Publish
            </div>
          </Button>
        </>
      )}

      <Popover>
        <PopoverTrigger>
          <Wrap>
            <WrapItem>
              <Avatar
                cursor={'pointer'}
                size="md"
                name={userInfo?.name}
                src=""
              />
            </WrapItem>
          </Wrap>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Button onClick={logOutHandler}>Logout</Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default SubHeaderAfterLoggedInPage
