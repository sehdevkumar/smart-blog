import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AppPathEnums } from '../typings/app-typings'
import { EditIcon, Link } from '../components/Icons'
import { Button } from '../components/ChakraUI'

const SubHeaderAfterLoggedInPage = () => {
  const route = usePathname()

  const [isWritePage, setWritePage] = useState<boolean>(false)
  const [isDefaultPages, setDefaultPages] = useState<boolean>(false)

  useEffect(() => {
    if (route === AppPathEnums.WRITE_POST) {
      setWritePage(true)
      setDefaultPages(false)
    } else {
      setWritePage(false)
      setDefaultPages(true)
    }
  }, [route])

  return (
    <>
      {isDefaultPages && (
        <Link href="/writepost" className="flex justify-center items-center">
          <EditIcon />
          <div className="text-gray-900 hover:text-gray-700 px-2 py-2 rounded-md text-sm font-medium">
            Write
          </div>
        </Link>
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
    </>
  )
}

export default SubHeaderAfterLoggedInPage
