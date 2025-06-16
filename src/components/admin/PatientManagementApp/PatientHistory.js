import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Spinner,
  Heading,
} from '@chakra-ui/react';
import { HistoryEntry } from 'views/admin/PatientManagementApp/PatientManagementApp';

export const PatientHistory= ({ entries, isLoading }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading) {
    return (
      <Box>
        <Heading size="md" mb={4} color="medical.700">
          Patient History
        </Heading>
        <Box textAlign="center" py={8}>
          <Spinner size="lg" color="blue.500" />
          <Text mt={2} color="gray.600">Loading patient history...</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="md" mb={4} color="medical.700">
        Patient History
      </Heading>
      
      {entries.length === 0 ? (
        <Box bg="white" border="1px" borderColor="gray.200" borderRadius="lg" p={6}>
          <Text textAlign="center" color="gray.500" py={8}>
            No history entries found for this patient.
          </Text>
        </Box>
      ) : (
        <VStack gap={4} align="stretch">
          {entries.map((entry, index) => (
            <Box
              key={entry.id}
              bg="purple.50"
              border="1px"
              borderColor="purple.200"
              borderRadius="lg"
              shadow="sm"
              p={6}
            >
              <VStack gap={4} align="stretch">
                <HStack justify="space-between" align="start">
                  <VStack align="start" gap={1}>
                    <Text fontSize="lg" fontWeight="bold" color="purple.800">
                      {entry.diagnosis}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {formatDate(entry.date)}
                    </Text>
                  </VStack>
                  <Badge
                    colorScheme="purple"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                  >
                    Entry #{entries.length - index}
                  </Badge>
                </HStack>
                
                <Box height="1px" bg="purple.200" />
                
                <VStack gap={3} align="stretch">
                  {entry.medication && (
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                        Prescribed Medication:
                      </Text>
                      <Text fontSize="md" bg="white" p={3} borderRadius="md" border="1px" borderColor="purple.200">
                        {entry.medication}
                      </Text>
                    </Box>
                  )}
                  
                  {entry.notes && (
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                        Additional Notes:
                      </Text>
                      <Text fontSize="md" bg="white" p={3} borderRadius="md" border="1px" borderColor="purple.200">
                        {entry.notes}
                      </Text>
                    </Box>
                  )}
                </VStack>
              </VStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};
