import React from 'react';
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
  updateRooms,
  createRooms,
  fetchAllRoomsData,
} from '../../../../../redux/slices/roomsSlice';

export default function RoomsModel({ action, rooms }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      roomNo: values.roomNo,
      type: values.type,
      status: values.status,
      beds: values.beds,
      companionNo: values.companionNo,
      degree: values.degree,
    };

    if (action === 'Add') {
      dispatch(createRooms(payload))
        .unwrap()
        .then(() => {
          dispatch(fetchAllRoomsData({ page: 1 }));
          onClose();
        })
        .catch((e) => console.log(e))
        .finally(() => setSubmitting(false));
    } else if (action === 'Update') {
      dispatch(updateRooms({ id: rooms?.id, data: payload }))
        .unwrap()
        .then(() => {
          dispatch(fetchAllRoomsData({ page: 1 }));
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
            {action === 'Add' ? 'Add Room' : 'Update Room'}
          </ModalHeader>

          <Formik
            initialValues={{
              roomNo: rooms ? rooms.roomNo : '',
              type: rooms ? rooms.type : '',
              status: rooms ? rooms.status : 'empty',
              beds: rooms ? rooms.beds : 1,
              companionNo: rooms ? rooms.companionNo : 0,
              degree: rooms ? rooms.degree : 'First',
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody pb={6}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <FormControl>
                      <FormLabel>Room No</FormLabel>
                      <Field
                        as={Input}
                        name="roomNo"
                        type="number"
                        placeholder="Room Number"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Type</FormLabel>
                      <Field
                        as={Select}
                        name="type"     
                      >
                        <option value="Operations">Operations</option>
                        <option value="ICU">ICU</option>
                        <option value="Regular">Regular</option>
                        <option value="VIP">VIP</option>
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Status</FormLabel>
                      <Field as={Select} name="status">
                        <option value="empty">Empty</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="reserved">Reserved</option>
                        <option value="service">Service</option>
                        <option value="busy">Busy</option>
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Beds</FormLabel>
                      <Field as={NumberInput} name="beds" min={1}>
                        <NumberInputField placeholder="Beds" />
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Companion No</FormLabel>
                      <Field as={NumberInput} name="companionNo" min={0}>
                        <NumberInputField placeholder="Companion No" />
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Degree</FormLabel>
                      <Field as={Select} name="degree">
                        <option value="First">First</option>
                        <option value="Second">Second</option>
                        <option value="Third">Third</option>
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
