import React, { useState } from 'react';
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AddUser } from 'views/admin/users/api';
import { GetRole } from 'views/admin/users/api';
import { FaRegEdit } from 'react-icons/fa';

export default function UserModel({action}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    const [formData, setFormData] = useState({
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      nationalId: '',
      roleId: '',
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
     const { data:RoleData, isLoading } = useQuery({
       queryKey: ['role'],
       queryFn: () => GetRole(),
       onError: (e) => {
         console.log(e);
       },
     });
    const queryClient = useQueryClient();
  const { mutate: mutateAdd } = useMutation({
    mutationFn: AddUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
},
  })
 const handleSubmit = (e) => {
   e.preventDefault();
   mutateAdd(formData)
 
 };

  return (
    <>
      <Button backgroundColor="main" color="white" onClick={onOpen}>
        {action == 'Add' ? 'Add' : <FaRegEdit/>}
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
            {action == 'Add' ? 'Add' : 'Update'}
            User
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
       {"Update"==action&&       <Heading
                color="main"
                as="h6"
                size="lg"
                marginBottom="10px"
                noOfLines={1}
              >
                User data
              </Heading>
}
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
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Username"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm Password"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>National Id</FormLabel>
                  <Input
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    required
                    placeholder="National Id"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Roles</FormLabel>
                  <Select
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleChange}
                    placeholder="Select role"
                  >
                    {RoleData?.map((role) => (
                      <option value={role?.id}>{role?.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </ModalBody>

              {action=="Update"&& 
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
                  <Input
                    name="modalPassword"
                    type="password"
                    value={formData.modalPassword}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    name="modalConfirmPassword1"
                    type="password"
                    value={formData.modalConfirmPassword1}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    name="modalConfirmPassword2"
                    type="password"
                    value={formData.modalConfirmPassword2}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                </FormControl>
              </Grid>
           </ModalBody>
              }
            <ModalFooter>
              <Button
                backgroundColor="main"
                colorScheme="green"
                type="submit"
                mr={3}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
