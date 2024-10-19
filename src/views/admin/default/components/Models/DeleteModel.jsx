import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import trash from '../../../../../assets/img/dashboards/bin_14119274 1.svg';
import { DeleteIcon } from '@chakra-ui/icons';
import { MdDeleteOutline } from 'react-icons/md';
export default function DeleteModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} backgroundColor="transparent"><MdDeleteOutline color='red' fontSize="25px"/></IconButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader
            display="flex"
            justifyContent="center"
            alignItems="center"
          ></ModalHeader> */}
          {/* <ModalCloseButton /> */}
          <ModalBody
            pb={3}
            paddingTop={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {/* <Lorem count={2} /> */}
            <img src={trash} alt="" />
            <Text>Are you sure?</Text>
            <Text color="#B3B3B3">Selected user eill be deleted</Text>
          </ModalBody>

          <ModalFooter display="flex" gap="10px">
            <Button width="100%" onClick={onClose}>
              Cancel
            </Button>
            <Button
              width="100%"
              backgroundColor="main"
              colorScheme="blue"
              mr={3}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
