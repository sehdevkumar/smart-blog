import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

const SubHeaderBeforeLoggedInPage = () => {

     const route = useRouter()

    const handleNavigation = (path:string)=> {
        
        route.push(path)
    }
   

  return (
    <div className='flex flex-row gap-x-3'>
      <Button colorScheme='none' onClick={() => handleNavigation('/about')} className="flex bg-[var(--app-btn-bg)] justify-center items-center">
        <div className="text-[var(--app-btn-text)]  hover:text-gray-700 px-2 py-2 rounded-md text-sm font-medium">
          About
        </div>
      </Button>
      <Button colorScheme='none' onClick={() => handleNavigation('/login')} className="flex bg-[var(--app-btn-bg-primary)]  justify-center items-center">
        <div className="text-[var(--app-btn-text)] hover:text-gray-700 px-2 py-2 rounded-md text-sm font-medium">
          Login
        </div>
      </Button>
      <Button colorScheme='none' onClick={() => handleNavigation('/signup')} className="flex  bg-[var(--app-btn-bg-secondary)] justify-center items-center">
        <div className="text-[var(--app-btn-text)] hover:text-gray-700 px-2 py-2 rounded-md text-sm font-medium">
          signup
        </div>
      </Button>
    </div>
  )
}

export default SubHeaderBeforeLoggedInPage
