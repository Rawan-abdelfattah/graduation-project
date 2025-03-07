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
import { AddRole } from 'views/admin/roles/api';
import { UpdateRole } from 'views/admin/roles/api';
import { notifyError } from 'utils/Toastify';

export default function RolesModel({ action ,id,inputs}) {
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
  const queryClient = useQueryClient();
  const { mutate: mutateAdd } = useMutation({
    mutationFn: AddRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['role'],
      });
      notifySuccess('role has been added');
      onClose();
    },
    onError: (e) => {
      e?.response?.data?.message?.forEach((error) => {
        notifyError(error);
      });
    },
  });
   const { mutate: mutateUpdate } = useMutation({
     mutationFn: UpdateRole,
     onSuccess: (data) => {
       queryClient.invalidateQueries({
         queryKey: ['role'],
       });
       notifySuccess('role has been update');
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
        size="md"
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
             
              <Grid
              
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
                  <Input
                    name="arName"
                    value={formData.arName}
                    onChange={handleChange}
                    required
                    placeholder="arName"
                    sx={{marginTop:"10px"}}
                  />
                </FormControl>
                
              </Grid>
            </ModalBody>

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
