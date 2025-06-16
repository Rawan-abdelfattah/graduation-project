import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Spinner,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { doctorClinicService } from 'services/doctorClinicService';

export const PatientSummary = ({ historyEntries }) => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleGenerateSummary = async () => {
    if (historyEntries.length === 0) {
      toast({
        title: 'No History',
        description: 'Please add some history entries first.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await doctorClinicService.getPatientHistorySummary(
        historyEntries,
        'comprehensive'
      );
      setSummary(result);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate summary. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Heading size="md" mb={4} color="medical.700">
        Patient History Summary
      </Heading>
      <Box bg="teal.50" border="1px" borderColor="teal.200" borderRadius="lg" p={6}>
        <VStack gap={4} align="stretch">
          <Button
            onClick={handleGenerateSummary}
            colorScheme="teal"
            size="lg"
            borderRadius="lg"
            px={8}
            isLoading={isLoading}
            loadingText="Generating..."
          >
            Generate Summary
          </Button>

          {isLoading && (
            <Box textAlign="center" py={8}>
              <Spinner size="lg" color="teal.500" />
              <Text mt={2} color="gray.600">Generating summary...</Text>
            </Box>
          )}

          {summary && !isLoading && (
            <Box bg="white" p={6} borderRadius="lg" border="1px" borderColor="teal.200">
              <VStack gap={4} align="stretch">
                <Text fontSize="lg" whiteSpace="pre-wrap">
                  {summary.summary}
                </Text>
                <HStack justify="space-between" fontSize="sm" color="gray.600">
                  <Text>Generated: {new Date(summary.timestamp).toLocaleString()}</Text>
                  <Text>Length: {summary.summary_length} characters</Text>
                </HStack>
              </VStack>
            </Box>
          )}

          {!summary && !isLoading && (
            <Box textAlign="center" py={8}>
              <Text color="gray.500">
                Click "Generate Summary" to create a summary of the patient's history.
              </Text>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
}; 