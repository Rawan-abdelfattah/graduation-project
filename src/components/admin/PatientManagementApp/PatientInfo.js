import React from 'react';
import {
  Box,
  HStack,
  VStack,
  Text,
  Badge,
  Heading,
} from '@chakra-ui/react';

export const PatientInfo = ({ reservation }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'yellow';
      case 'CONFIRMED':
        return 'green';
      case 'CANCELLED':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Pending';
      case 'CONFIRMED':
        return 'Confirmed';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  return (
    <Box>
      <Heading size="md" mb={4} color="medical.700">
        Patient Information
      </Heading>
      <Box bg="blue.50" border="1px" borderColor="blue.200" borderRadius="lg" p={6}>
        <VStack gap={4} align="stretch">
          <HStack justify="space-between" align="center">
            <VStack align="start" gap={1}>
              <Text fontSize="2xl" fontWeight="bold" color="medical.800">
                {reservation.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Reservation ID: {reservation.id}
              </Text>
            </VStack>
            <Badge
              colorScheme={getStatusColor(reservation.status)}
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
            >
              {getStatusText(reservation.status)}
            </Badge>
          </HStack>
          
          <Box height="1px" bg="blue.200" />
          
          <HStack gap={8} wrap="wrap">
            <VStack align="start">
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Email
              </Text>
              <Text fontSize="lg" fontWeight="semibold">
                {reservation.email}
              </Text>
            </VStack>
            
            <VStack align="start">
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Phone Number
              </Text>
              <Text fontSize="lg" fontWeight="semibold">
                {reservation.phone}
              </Text>
            </VStack>

            <VStack align="start">
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Appointment Date
              </Text>
              <Text fontSize="lg" fontWeight="semibold">
                {reservation.date} at {reservation.time}
              </Text>
            </VStack>
          </HStack>

          {reservation.notes && (
            <>
              <Box height="1px" bg="blue.200" />
              <VStack align="start">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  Notes
                </Text>
                <Text fontSize="md">
                  {reservation.notes}
                </Text>
              </VStack>
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
};
