import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  Grid,
  GridItem,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Divider
} from '@chakra-ui/react';
import MainLayout from 'layouts/landing/MainLayout';
import Api from 'config/api';
import { createReservation, resetReservationState } from '../../redux/slices/reservationSlice';

function Reservation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.reservation);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '', 
    doctorId: '',
    specializationId: '',
    notes: ''
  });
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSpecializations, setLoadingSpecializations] = useState(true);

  const toast = useToast();

  useEffect(() => {
    // Reset reservation state when component mounts
    dispatch(resetReservationState());
    
    // Fetch doctors
    Api.get('/doctor/all')
      .then(res => {
        setDoctors(res.data?.data || res.data || []);
        setLoadingDoctors(false);
      })
      .catch(() => setLoadingDoctors(false));
    // Fetch specializations
    Api.get('/spatialization/all/1')
      .then(res => {
        setSpecializations(res.data?.data || res.data || []);
        setLoadingSpecializations(false);
      })
      .catch(() => setLoadingSpecializations(false));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'doctorId' || name === 'specializationId' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await dispatch(createReservation({
        ...formData,
        doctorId: Number(formData.doctorId),
        specializationId: Number(formData.specializationId)
      })).unwrap();
      
      toast({
        title: 'Reservation Submitted',
        description: "We'll contact you shortly to confirm your appointment.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        doctorId: '',
        specializationId: '',
        notes: ''
      });

      // Redirect to success page
      navigate('/reservation-success');
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: error.message || 'An error occurred while submitting your reservation.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const renderSuccessMessage = () => (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      bg="green.50"
      borderRadius="md"
      mb={6}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Reservation Submitted Successfully!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        We have received your reservation request. Our team will contact you shortly to confirm your appointment.
      </AlertDescription>
    </Alert>
  );

  const renderReservationForm = () => (
    <form onSubmit={handleSubmit}>
      <CardBody>
        <VStack spacing={6}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} w="full">
            <GridItem>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} w="full">
            <GridItem>
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel>Select Specialization</FormLabel>
                <Select
                  name="specializationId"
                  value={formData.specializationId}
                  onChange={handleChange}
                  placeholder={loadingSpecializations ? 'Loading...' : 'Select Specialization'}
                  isDisabled={loadingSpecializations}
                >
                  {specializations.map((spec) => (
                    <option key={spec.id} value={spec.id}>{spec.name}</option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} w="full">
            <GridItem>
              <FormControl isRequired>
                <FormLabel>Select Doctor</FormLabel>
                <Select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  placeholder={loadingDoctors ? 'Loading...' : 'Select Doctor'}
                  isDisabled={loadingDoctors}
                >
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>{doc.user?.name || doc.name}</option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>
         
          </Grid>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} w="full">
            <GridItem>
              <FormControl isRequired>
                <FormLabel>Preferred Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel>Preferred Time</FormLabel>
                <Input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
          </Grid>

          <FormControl>
            <FormLabel>Additional Notes</FormLabel>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional information you'd like to share..."
              size="lg"
              rows={4}
            />
          </FormControl>
        </VStack>
      </CardBody>
      <CardFooter>
        <Button
          type="submit"
          bg="#3B8F4F"
          color="white"
          size="lg"
          width="full"
          _hover={{ bg: '#2d6b3c' }}
          isLoading={loading}
          loadingText="Submitting..."
        >
          Submit Reservation
        </Button>
      </CardFooter>
    </form>
  );

  return (
    <MainLayout>
      <Box py={12} px={4}>
        <Box maxW="3xl" mx="auto">
          <Card>
            <CardHeader bg="#3B8F4F" color="white" textAlign="center" py={8}>
              <Heading size="xl">Make a Reservation</Heading>
            </CardHeader>
            {success ? renderSuccessMessage() : renderReservationForm()}
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Reservation; 