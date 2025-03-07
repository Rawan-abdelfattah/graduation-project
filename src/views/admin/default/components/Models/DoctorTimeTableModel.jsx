import React, { useEffect } from 'react';
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
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  updateDoctorTimeTable,
  createDoctorTimeTable,
  fetchAllDoctorTimeTableData,
  fetchAllDoctors,
} from '../../../../../redux/slices/doctorTimeTableSlice';

export default function DoctorTimeTableModel({ action, doctorTimeTable }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const doctors = useSelector(
    (state) => state.doctorTimeTable.doctors.data || [],
  );

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(fetchAllDoctors());
    }
  }, [dispatch, doctors]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = values.schedule.map(({ day, startTime, endTime }) => ({
      doctorId: Number(values.doctorId),
      is_deleted: false,
      day,
      startTime,
      endTime,
    }));

    try {
      if (action === 'Add') {
        await dispatch(createDoctorTimeTable(payload)).unwrap();
        toast({ title: 'Schedule added successfully!', status: 'success' });
      } else {
        await dispatch(
          updateDoctorTimeTable({ id: doctorTimeTable?.id, data: payload[0] }), // Ensure correct ID is used
        ).unwrap();
        toast({ title: 'Schedule updated successfully!', status: 'success' });
      }

      dispatch(fetchAllDoctorTimeTableData({ page: 1 })); // Refresh data after update
      onClose();
    } catch (error) {
      console.error(error);
      toast({ title: 'Error saving schedule', status: 'error' });
    } finally {
      setSubmitting(false);
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
          icon={<FaRegEdit />}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
            <IoPersonAddOutline color="main" />
            {action === 'Add' ? ' Add Time-Table' : ' Update Time-Table'}
          </ModalHeader>

          <Formik
            initialValues={{
              doctorId: doctorTimeTable?.doctorId || '',
              schedule: [
                {
                  day: doctorTimeTable?.day || 'Monday',
                  startTime: doctorTimeTable?.startTime || '',
                  endTime: doctorTimeTable?.endTime || '',
                },
              ],
            }}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form>
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Doctor</FormLabel>
                    <Field as={Select} name="doctorId">
                      <option value="">Select Doctor</option>
                      {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.user.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>

                  {values.schedule.map((_, index) => (
                    <Grid
                      key={index}
                      templateColumns="repeat(4, 1fr)"
                      gap={4}
                      mt={4}
                      alignItems="center"
                    >
                      <FormControl>
                        <FormLabel>Day</FormLabel>
                        <Field as={Select} name={`schedule.${index}.day`}>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </Field>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Start Time</FormLabel>
                        <Field
                          as={Input}
                          name={`schedule.${index}.startTime`}
                          type="time"
                          value={values.schedule[index].startTime || ''}
                          onChange={(e) =>
                            setFieldValue(
                              `schedule.${index}.startTime`,
                              e.target.value,
                            )
                          }
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>End Time</FormLabel>
                        <Field
                          as={Input}
                          name={`schedule.${index}.endTime`}
                          type="time"
                          value={values.schedule[index].endTime || ''}
                          onChange={(e) =>
                            setFieldValue(
                              `schedule.${index}.endTime`,
                              e.target.value,
                            )
                          }
                        />
                      </FormControl>

                      {values.schedule.length > 1 && (
                        <div className="flex">
                          <h5>Delete</h5>
                          <IconButton
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            onClick={() =>
                              setFieldValue(
                                'schedule',
                                values.schedule.filter((_, i) => i !== index),
                              )
                            }
                            aria-label="Delete Schedule"
                          />
                        </div>
                      )}
                    </Grid>
                  ))}

                  {action === 'Add' && (
                    <Button
                      mt={4}
                      onClick={() =>
                        setFieldValue('schedule', [
                          ...values.schedule,
                          { day: '', startTime: '', endTime: '' },
                        ])
                      }
                    >
                      + Add Another Day
                    </Button>
                  )}
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
