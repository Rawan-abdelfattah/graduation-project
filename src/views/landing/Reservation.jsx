import React, { useState } from 'react';
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
  useToast
} from '@chakra-ui/react';
import MainLayout from 'layouts/landing/MainLayout';

function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    notes: ''
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your form submission logic here
    console.log('Form submitted:', formData);
    toast({
      title: 'Reservation Submitted',
      description: "We'll contact you shortly to confirm your appointment.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <MainLayout>
      <Box py={12} px={4}>
        <Box maxW="3xl" mx="auto">
          <Card>
            <CardHeader bg="#3B8F4F" color="white" textAlign="center" py={8}>
              <Heading size="xl">Make a Reservation</Heading>
            </CardHeader>
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
                        <FormLabel>Select Service</FormLabel>
                        <Select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          placeholder="Select a service"
                        >
                          <option value="general">General Consultation</option>
                          <option value="specialist">Specialist Consultation</option>
                          <option value="emergency">Emergency Care</option>
                          <option value="follow-up">Follow-up Visit</option>
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
                >
                  Submit Reservation
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Reservation; 