import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { IoPersonAddOutline } from 'react-icons/io5';

export default function UserModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button backgroundColor="main" color="white" onClick={onOpen}>
        Add
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        borderRadius="10px"
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="5px"
            fontSize="30px"
            fontWeight="bold"
          >
            <IoPersonAddOutline color="main" />
            Add User
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody pb={6}>
            <Heading
              color="main"
              as="h6"
              size="lg"
              marginBottom="10px"
              noOfLines={1}
            >
              User data
            </Heading>
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={4}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input ref={initialRef} placeholder="Name" />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="Username" />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input placeholder="Password" />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input placeholder="Password" />
              </FormControl>
              <FormControl>
                <FormLabel>National Id</FormLabel>
                <Input placeholder="National Id" />
              </FormControl>
              <FormControl>
                <FormLabel>Roles</FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
            </Grid>
          </ModalBody>
          <ModalBody pb={6}>
            <Heading
              color="main"
              as="h6"
              size="lg"
              marginBottom="10px"
              noOfLines={1}
            >
              Password
            </Heading>

            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={4}
            >
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input placeholder="Password" />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input placeholder="Password" />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input placeholder="Password" />
              </FormControl>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button backgroundColor="main" colorScheme="green" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
