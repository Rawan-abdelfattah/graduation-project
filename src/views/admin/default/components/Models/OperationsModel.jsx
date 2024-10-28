import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Select,
  NumberInput,
  NumberInputField,
  IconButton,
} from '@chakra-ui/react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';
import {
  updateOperations,
  createOperations,
  fetchAllOperationsData,
} from '../../../../../redux/slices/operationsSlice';
import axios from 'axios';
import Api from 'config/api';

export default function OperationsModel({ action, operations }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [specializations, setSpecializations] = useState([]);

  const specialization =()=>{
      Api.get('spatialization/all/1')
      .then((response) => setSpecializations(response.data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    specialization()  
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      arName: values.arName,
      name: values.name,
      specializationId: values.specializationId,
    };

    if (action === 'Add') {
      dispatch(createOperations(payload))
        .unwrap()
        .then(() => {
          dispatch(fetchAllOperationsData({ page: 1 }));
          onClose();
        })
        .catch((e) => console.log(e))
        .finally(() => setSubmitting(false));
    } else if (action === 'Update') {
      dispatch(updateOperations({ id: operations?.id, data: payload }))
        .unwrap()
        .then(() => {
          dispatch(fetchAllOperationsData({ page: 1 }));
          onClose();
        })
        .catch((e) => console.log(e))
        .finally(() => setSubmitting(false));
    }
  };

  return (
    <>
      {action === 'Add' ? (
        <Button backgroundColor="main" color="white" onClick={onOpen}>
          + Add
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
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
            <IoPersonAddOutline color="main" />
            {action === 'Add' ? 'Add Operation' : 'Update Operation'}
          </ModalHeader>

          <Formik
            initialValues={{
              arName: operations?.arName || '',
              name: operations?.name || '',
              specializationId: operations?.specializationId || '',
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody pb={6}>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    <FormControl>
                      <FormLabel>Arabic Name</FormLabel>
                      <Field
                        as={Input}
                        name="arName"
                        ref={initialRef}
                        placeholder="Enter Arabic name"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>English Name</FormLabel>
                      <Field
                        as={Input}
                        name="name"
                        placeholder="Enter English name"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Specialization</FormLabel>
                      <Field as={Select} name="specializationId" placeholder="Select specialization">
                        {specializations?.data?.map((spec) => (
                          <option key={spec.id} value={spec.id}>
                            {spec.name}
                          </option>
                        ))}
                      </Field>
                    </FormControl>
                  </Grid>
                </ModalBody>

                <ModalFooter>
                  <Button
                    backgroundColor="main"
                    colorScheme="green"
                    type="submit"
                    mr={3}
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
