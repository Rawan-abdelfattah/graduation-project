import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Input,
  Checkbox,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';
import {
  updateScreen,
  createScreen,
  fetchAllScreenData,
} from '../../../../../redux/slices/screenSlice';

export default function ScreenModel({ action, categoryData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
   
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      route: values.route,
      name: values.name,
      screenCategoryId: parseInt(values.screenCategoryId),
      actions: values.actions,
    };

    if (action === 'Add') {
      dispatch(createScreen(payload))
        .unwrap()
        .then(() => {
          dispatch(fetchAllScreenData({ page: 1 }));
          onClose();
        })
        .catch((e) => console.log(e))
        .finally(() => setSubmitting(false));
    } else if (action === 'Update') {
      dispatch(updateScreen({ id: categoryData?.id, data: payload }))
        .unwrap()
        .then(() => {
          dispatch(fetchAllScreenData({ page: 1 }));
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
            {action === 'Add' ? 'Add' : 'Update'} Screen Category
          </ModalHeader>
          
          <Formik
            initialValues={{
              name: categoryData ? categoryData.name : '',
              route: 'admin/Screen',
              screenCategoryId: categoryData ? categoryData.id : 2,
              actions: ["ADD", "UPDATE", "DELETE"],
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody pb={6}>
                  {action === 'Update' && (
                    <Heading
                      color="main"
                      as="h6"
                      size="lg"
                      marginBottom="10px"
                      noOfLines={1}
                    >
                      Screen Category data
                    </Heading>
                  )}
                  <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Field
                        as={Input}
                        name="name"
                        placeholder="Name"
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Route</FormLabel>
                      <Field
                        as={Input}
                        name="route"
                        placeholder="Route"
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Screen Category ID</FormLabel>
                      <Field
                        as={Input}
                        type="number"
                        name="screenCategoryId"
                        placeholder="Screen Category ID"
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Actions</FormLabel>
                      <CheckboxGroup colorScheme="green" defaultValue={["ADD", "UPDATE", "DELETE"]}>
                        <Stack spacing={5} direction="row">
                          <Field as={Checkbox} name="actions" value="ADD">
                            Add
                          </Field>
                          <Field as={Checkbox} name="actions" value="UPDATE">
                            Update
                          </Field>
                          <Field as={Checkbox} name="actions" value="DELETE">
                            Delete
                          </Field>
                        </Stack>
                      </CheckboxGroup>
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
