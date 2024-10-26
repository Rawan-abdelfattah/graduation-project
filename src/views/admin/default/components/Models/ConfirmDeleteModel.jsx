import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import trash from '../../../../../assets/img/dashboards/bin_14119274 1.svg';

export default function ConfirmDeleteModel({
  isOpen,
  onOpen,
  onClose,
  action,
}) {
  const handleAction = () => {
    if (action) {
      action();
    }
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody
            pb={3}
            paddingTop={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img src={trash} alt="Trash icon" />
            <Text>Are you sure?</Text>
            <Text color="#B3B3B3">Selected user will be deleted</Text>
          </ModalBody>

          <ModalFooter display="flex" gap="10px">
            <Button width="100%" onClick={onClose}>
              Cancel
            </Button>
            <Button
              width="100%"
              backgroundColor="main"
              colorScheme="blue"
              onClick={handleAction}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
