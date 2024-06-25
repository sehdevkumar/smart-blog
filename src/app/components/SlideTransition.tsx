"use client";
import { useDisclosure, Slide, Box } from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle } from 'react';

export interface SlideCallBacks extends React.HTMLAttributes<HTMLElement | null> {
  direction?: "bottom" | "left" | "top" | "right";
  children?: React.ReactNode;
  onToggleSlide?: () => void;
}

const SlideTransition = forwardRef(function SlideTransition(
  props: SlideCallBacks,
  ref
) {
  const { isOpen, onToggle } = useDisclosure();


  useImperativeHandle(ref, () => ({
    onToggleSlide() {
      onToggle();
    }
  }), [onToggle]);




  return (
    <div className="mobile:block desktop:hidden tablet:hidden">
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex="9"
          onClick={onToggle}
        />
      )}
      <Slide   direction={props?.direction} in={isOpen} style={{ zIndex: 10 }}>
        <Box
          color="white"
          mt="4"
          rounded="md"
          shadow="md"
        >
          {props?.children}
        </Box>
      </Slide>
    </div>
  );
});

export default React.memo(SlideTransition)