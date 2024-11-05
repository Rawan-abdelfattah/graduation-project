import React, { useEffect, useState } from 'react';
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
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';
import {
  updateScreen,
  createScreen,
  fetchAllScreenData,
} from '../../../../../redux/slices/screenSlice';
import { fetchAllScreenCategoryData } from '../../../../../redux/slices/screenCategorySlice';

export default function ScreenModel({ action, screen }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const screenCategories = useSelector((state) => state.screenCategory.data);

  // Map screen actions to extract only the action names for initial state
  const [selectedActions, setSelectedActions] = useState(
    screen ? screen.actions.map(action => action.name) : []
  );

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    dispatch(fetchAllScreenCategoryData({ page: 1, query: '' }));
  }, [dispatch]);

  const handleActionChange = (value) => {
    setSelectedActions(value);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      route: values.route,
      name: values.name,
      screenCategoryId: parseInt(values.screenCategoryId),
      actions: selectedActions,
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
      dispatch(updateScreen({ id: screen?.id, data: payload }))
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
              name: screen ? screen.name : '',
              route: 'admin/Screen',
              screenCategoryId: screen ? screen.screenCategoryId : '',
              actions: screen ? screen.actions.map(action => action.name) : [],
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
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
                      <Field as={Input} name="name" placeholder="Name" required />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Route</FormLabel>
                      <Field as={Input} name="route" placeholder="Route" required />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Screen Category ID</FormLabel>
                      <Field
                        as={Select}
                        name="screenCategoryId"
                        onChange={(e) => {
                          setFieldValue('screenCategoryId', e.target.value);
                        }}
                      // value={screen ? screen.screenCategoryId : ''}
                      >
                        {screenCategories?.data?.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Field>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Actions</FormLabel>
                      <CheckboxGroup
                        colorScheme="green"
                        value={selectedActions}
                        onChange={(value) => {
                          handleActionChange(value);
                          setFieldValue("actions", value);
                        }}
                      >
                        <Stack spacing={5} direction="row">
                          <Checkbox value="ADD" isChecked={selectedActions.includes('ADD')}>
                            Add
                          </Checkbox>
                          <Checkbox value="UPDATE" isChecked={selectedActions.includes('UPDATE')}>
                            Update
                          </Checkbox>
                          <Checkbox value="DELETE" isChecked={selectedActions.includes('DELETE')}>
                            Delete
                          </Checkbox>
                          <Checkbox value="VIEW" isChecked={selectedActions.includes('VIEW')}>
                            View
                          </Checkbox>
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
