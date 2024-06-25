import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon, WarningIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { type IMessageBoxEmitter, type MessageBoxProps, MessageIconTypeEnum, PopupActionEnum } from '../typings/app-typings';

const MessageBox = ({ dialogDetails, confirmBtnEmitter }: { dialogDetails?: MessageBoxProps; confirmBtnEmitter: (data: IMessageBoxEmitter) => void }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  function handleClose() {
    onClose();
    confirmBtnEmitter({ action: PopupActionEnum.CANCEL });
  }

  function handleSubmitBtn() {
    confirmBtnEmitter({ action: PopupActionEnum.SUBMIT });
  }

  const MessageIcon = () => {
    switch (dialogDetails?.iconType) {
      case MessageIconTypeEnum.SUCCESS:
        return <CheckCircleIcon outline={'none'} color="green.500" boxSize={6} />;

      case MessageIconTypeEnum.INFO:
        return <InfoIcon boxShadow={'none'} outline={'none'} color="blue.500" boxSize={6} />;

      case MessageIconTypeEnum.ERROR:
        return <WarningTwoIcon outline={'none'} color="red.500" boxSize={6} />;

      case MessageIconTypeEnum.WARNING:
        return <WarningIcon outline={'none'} color="yellow.500" boxSize={6} />;

      default:
        return <InfoIcon outline={'none'} color="blue.500" boxSize={6} />;
    }
  };

  return (
    <Modal onClose={handleClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className='mobile:w-[300px] desktop:w-[400px] tablet:w-[400px]'>
        <ModalHeader>
          <Box display="flex" alignItems="center" boxShadow={'none'}>
            <IconButton boxShadow={'none'} aria-label="Message Icon" icon={<MessageIcon />} variant="unstyled"  autoFocus={false}/>
            <Box as="span" fontWeight="bold" fontSize="lg" ml={2}>
              {dialogDetails?.title}
            </Box>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {dialogDetails?.content}
        </ModalBody>
        <ModalFooter>
          {dialogDetails?.closeMsg && (
            <Button bg={'var(--app-btn-close)'}  onClick={handleClose} mr={3}>
              {dialogDetails?.closeMsg}
            </Button>
          )}
          <Button  bg={'var(--app-btn-bg)'} color={'var(--app-btn-text)'} onClick={handleSubmitBtn}>
            {dialogDetails?.confirmMsg ?? 'Ok'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MessageBox;

  //  --app-btn-bg: #7ECC29;
  //   --app-btn-cancel: #E87474;
  //   --app-btn-close:#A1A1A1;