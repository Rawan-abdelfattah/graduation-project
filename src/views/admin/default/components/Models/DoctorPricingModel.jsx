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
import {
  updateDoctorPricing,
  createDoctorPricing,
  fetchAllDoctorPricingData,
  fetchAllDoctors,
} from '../../../../../redux/slices/doctorPricingSlice';

export default function DoctorPricingModel({ action, doctorPricing }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const doctors = useSelector(
    (state) => state.doctorPricing.doctors.data || []
  );

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(fetchAllDoctors());
    }
  }, [dispatch]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      doctorId: Number(values.doctorId),
      consultationPrice: Number(values.consultationPrice),
      consultationPeriod: Number(values.consultationPeriod),
      examinationPrice: Number(values.examinationPrice),
      examinationPeriod: Number(values.examinationPeriod),
    };

    try {
      if (action === 'Add') {
        await dispatch(createDoctorPricing(payload)).unwrap();
        toast({ title: 'Pricing added successfully!', status: 'success' });
      } else {
        await dispatch(
          updateDoctorPricing({ id: doctorPricing?.id, data: payload })
        ).unwrap();
        toast({ title: 'Pricing updated successfully!', status: 'success' });
      }

      dispatch(fetchAllDoctorPricingData({ page: 1 }));
      onClose();
    } catch (error) {
      console.error(error);
      toast({ title: 'Error saving pricing', status: 'error' });
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
            {action === 'Add' ? ' Add Doctor Pricing' : ' Update Doctor Pricing'}
          </ModalHeader>

          <Formik
            initialValues={{
              doctorId: doctorPricing?.doctorId || '',
              consultationPrice: doctorPricing?.consultationPrice || '',
              consultationPeriod: doctorPricing?.consultationPeriod || '',
              examinationPrice: doctorPricing?.examinationPrice || '',
              examinationPeriod: doctorPricing?.examinationPeriod || '',
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody pb={6}>
                  {/* Doctor Selection */}
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

                  <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
                    {/* Consultation Price */}
                    <FormControl>
                      <FormLabel>Consultation Price</FormLabel>
                      <Field as={Input} type="number" name="consultationPrice" />
                    </FormControl>

                    {/* Consultation Period */}
                    <FormControl>
                      <FormLabel>Consultation Period (minutes)</FormLabel>
                      <Field as={Input} type="number" name="consultationPeriod" />
                    </FormControl>

                    {/* Examination Price */}
                    <FormControl>
                      <FormLabel>Examination Price</FormLabel>
                      <Field as={Input} type="number" name="examinationPrice" />
                    </FormControl>

                    {/* Examination Period */}
                    <FormControl>
                      <FormLabel>Examination Period (minutes)</FormLabel>
                      <Field as={Input} type="number" name="examinationPeriod" />
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
