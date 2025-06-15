import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Confetti from 'react-confetti';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from 'layouts/landing/MainLayout';

function ReservationSuccess() {
  const navigate = useNavigate();
  const { reservations } = useSelector((state) => state.reservation);
  const latestReservation = reservations[reservations.length - 1];
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <title>Reservation Confirmed | Doctor Bot</title>
        <meta name="description" content="Your appointment has been successfully booked. View your reservation details and next steps." />
      </Helmet>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={200}
        gravity={0.2}
      />
      <Box py={12} px={4}>
        <Box maxW="3xl" mx="auto">
          <Card>
            <CardHeader bg="#3B8F4F" color="white" textAlign="center" py={8}>
              <Heading size="xl">Reservation Confirmed!</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
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
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    Your Reservation Has Been Submitted
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    We have received your reservation request. Our team will contact you shortly to confirm your appointment.
                  </AlertDescription>
                </Alert>

                <Box
                  p={6}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor={borderColor}
                  bg={bgColor}
                >
                  <Heading size="md" mb={4}>Reservation Details</Heading>
                  <VStack align="stretch" spacing={3}>
                    <Text><strong>Name:</strong> {latestReservation?.name}</Text>
                    <Text><strong>Email:</strong> {latestReservation?.email}</Text>
                    <Text><strong>Phone:</strong> {latestReservation?.phone}</Text>
                    <Text><strong>Date:</strong> {latestReservation?.date}</Text>
                    <Text><strong>Time:</strong> {latestReservation?.time}</Text>
                    {latestReservation?.notes && (
                      <Text><strong>Additional Notes:</strong> {latestReservation.notes}</Text>
                    )}
                  </VStack>
                </Box>

                <Divider />

                <VStack spacing={4}>
                  <Text textAlign="center" color="gray.600">
                    What happens next?
                  </Text>
                  <VStack align="stretch" spacing={2}>
                    <Text>1. Our team will review your reservation request</Text>
                    <Text>2. You will receive a confirmation email within 24 hours</Text>
                    <Text>3. Please keep your contact information updated</Text>
                  </VStack>
                </VStack>

                <Button
                  colorScheme="green"
                  size="lg"
                  onClick={() => navigate('/reservation')}
                >
                  Make Another Reservation
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default ReservationSuccess; 