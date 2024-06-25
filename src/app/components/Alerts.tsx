import { useDisclosure, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter ,AlertDialog, Box } from "@chakra-ui/react"
import React, { forwardRef, useImperativeHandle } from "react"


export interface AlertCallBacks extends  React.HTMLAttributes<HTMLElement>{
     onOpen?:()=>void,
     onClose?:()=>void,
     title?:string,message?:string,
     children?: React.ReactNode
}

export default  forwardRef(function AlertDialogBox(props:AlertCallBacks,ref) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cancelRef = React.useRef<any>(null)


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



  return (
    <Box display={'none'}>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
              <span className="inter">
              {props?.title}
              </span>
            </AlertDialogHeader>
          {/* <AlertDialogCloseButton /> */}
          <AlertDialogBody>
            <span className="inter">
              {props?.message}
              </span>
          </AlertDialogBody>
          <AlertDialogFooter>
            <span className="inter">
              {props?.children}

             </span>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  )
})