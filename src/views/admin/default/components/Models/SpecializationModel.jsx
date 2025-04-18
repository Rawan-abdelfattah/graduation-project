import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Grid, 
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, 
  useDisclosure,
} from '@chakra-ui/react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { Select } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AddUser } from 'views/admin/users/api';
import { GetRole } from 'views/admin/users/api';
import { UpdateUser } from 'views/admin/users/api';
import { AddRole } from 'views/admin/roles/api';
import { FaRegEdit } from 'react-icons/fa';
import { notifySuccess } from 'utils/Toastify';
import { UpdateRole } from 'views/admin/roles/api';
import { notifyError } from 'utils/Toastify';
import { AddSpecialization } from 'views/admin/specialization/api';
import { UpdateSpecialization } from 'views/admin/specialization/api';

export default function SpecializationModel({ action ,id,inputs}) {
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
    mutationFn: AddSpecialization,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['spatialization'],
      });
      notifySuccess('spatialization has been added');
      onClose();
    },
    onError: (e) => {
      e?.response?.data?.message?.forEach((error) => {
        notifyError(error);
      });
    },
  });
   const { mutate: mutateUpdate } = useMutation({
     mutationFn: UpdateSpecialization,
     onSuccess: (data) => {
       queryClient.invalidateQueries({
         queryKey: ['spatialization'],
       });
       notifySuccess('spatialization has been update');
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
      {action === 'Add' ? (
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
            <IoPersonAddOutline style={{ color: 'green' }} />
            {action === 'Add' ? 'Add' : 'Edit'}
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(2, 1fr)',
          
                }}
                gap={4}
              >
                <FormControl>
                  <FormLabel>English Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="English Name"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Arabic Name</FormLabel>
                  <Input
                    name="arName"
                    value={formData.arName}
                    onChange={handleChange}
                    required
                    placeholder="Arabic Name"
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
