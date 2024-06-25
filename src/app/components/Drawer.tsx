import { useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from "@chakra-ui/react"
import React, { useEffect, useImperativeHandle , forwardRef } from "react"

export interface CustomDrawerProps extends  React.HTMLAttributes<HTMLElement>{
     onOpen?:()=>void,
     onClose?:()=>void,
     placement?: 'right' | 'left' | 'top';
     children?: React.ReactNode
}



export default  forwardRef(function CustomDrawer(props:CustomDrawerProps,ref) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState<'right' | 'left' | 'top'>('right')


    useImperativeHandle(ref, () => {
    return {
      onOpen() {
        onOpen()
      },
      onClose() {
        onClose()
      }
     
    };
  }, [onClose, onOpen]);



  useEffect(()=> {
   
 setPlacement(props?.placement ?? 'left');

  },[props?.placement])

  return (
    <>
      <Drawer  placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent style={{padding:'0'}}>
          <DrawerBody style={{padding:'0'}}>
            {props?.children}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
})