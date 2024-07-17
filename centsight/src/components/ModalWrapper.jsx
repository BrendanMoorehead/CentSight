import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
const ModalWrapper = ({
  isOpen,
  onClose,
  title,
  children,
  closeBtnText = 'Cancel',
  confirmBtnText = 'Save',
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            {closeBtnText}
          </Button>
          <Button colorScheme="blue" onClick={onConfirm}>
            {confirmBtnText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalWrapper;
