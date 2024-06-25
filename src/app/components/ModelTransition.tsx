
"use client";
import { Modal, ModalContent, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle } from 'react';

export interface ModelCallBacks extends  React.HTMLAttributes<HTMLElement>{
     onOpen?:()=>void,
     onClose?:()=>void,
     children?: React.ReactNode
}

export default forwardRef(function ModelTransition(props : ModelCallBacks
,ref)  {
    const { isOpen, onOpen, onClose } = useDisclosure()

 
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
   <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
           {props?.children}
        </ModalContent>
      </Modal>
  );
})


