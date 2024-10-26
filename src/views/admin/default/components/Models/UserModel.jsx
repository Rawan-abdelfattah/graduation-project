import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  IconButton,
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
import { notifySuccess } from 'utils/Toastify';
import { UpdateUser } from 'views/admin/users/api';
import { notifyError } from 'utils/Toastify';

export default function UserModel({ action ,id,inputs}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [formData, setFormData] = useState(inputs);
useEffect(()=>{
  setFormData(inputs)
},[])
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const { data: RoleData, isLoading } = useQuery({
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
        queryKey: ['user'],
      });
      notifySuccess('user has been added');
      onClose()
    },
    onError: (e) => {
      e?.response?.data?.message?.forEach(error=>{

        notifyError(error);
      })
    }
  });
   const { mutate: mutateUpdate } = useMutation({
     mutationFn: UpdateUser,
     onSuccess: (data) => {
       queryClient.invalidateQueries({
         queryKey: ['user'],
       });
       notifySuccess('user has been update');
       onClose();
     },
     onError: (e) => {
       e?.response?.data?.message?.forEach((error) => {
         notifyError(error);
       });
     },
   });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const userData = {
        ...formData,
        nationalId: parseInt(formData.nationalId),
        roleId: parseInt(formData.roleId),
      };

      if (action === 'Add') {
        mutateAdd(userData);
      } else {
        mutateUpdate({id,data:userData});
      }
    };

  return (
    <>
      {action == 'Add' ? (
        <Button backgroundColor="main" color="white" onClick={onOpen}>
          Add
        </Button>
      ) : (
        <IconButton
          onClick={onOpen}
          color="main"
          backgroundColor="transparent"
          fontSize="20px"
        >
          <FaRegEdit />
        </IconButton>
      )}

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
            <IoPersonAddOutline style={{color:"green"}}  />
            {action == 'Add' ? 'Add' : 'Edit'}
       
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              {'Update' == action && (
                <Heading
                  color="main"
                  as="h6"
                  size="lg"
                  marginBottom="10px"
                  noOfLines={1}
                >
                  User data
                </Heading>
              )}
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
                 {action == 'Add' && (
                  <>
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
                </>
                )}
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

            {action == 'Update' && (
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
                 
                    <>
                      <FormControl>
                        <FormLabel>old Password</FormLabel>
                        <Input
                          name="modalPassword"
                          type="password"
                          value={formData.modalPassword}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>New Password</FormLabel>
                        <Input
                          name="modalConfirmPassword1"
                          type="password"
                          value={formData.modalConfirmPassword1}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                        />
                      </FormControl>{' '}
                    </>
            
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
            )}
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
