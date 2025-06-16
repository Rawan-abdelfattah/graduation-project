import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Flex,
  Spacer,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { PatientSearch } from 'components/admin/PatientManagementApp/PatientSearch';
import { PatientInfo } from 'components/admin/PatientManagementApp/PatientInfo';
import { PatientHistory } from 'components/admin/PatientManagementApp/PatientHistory';
import { PatientSummary } from 'components/admin/PatientManagementApp/PatientSummary';
import { AddHistoryForm } from 'components/admin/PatientManagementApp/AddHistoryForm';
import { doctorClinicService } from 'services/doctorClinicService';

const PatientManagementApp = () => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [historyEntries, setHistoryEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleReservationSelect = (reservation) => {
    setSelectedReservation(reservation);
    loadPatientHistory(reservation.id);
  };

  const loadPatientHistory = async (reservationId) => {
    setIsLoading(true);
    try {
      // TODO: Get doctorId from auth context or props
      const doctorId = 1; // Temporary hardcoded value
      const history = await doctorClinicService.getPatientHistory(reservationId, doctorId);
      setHistoryEntries(history);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load patient history. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setHistoryEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHistoryEntry = (entry) => {
    setHistoryEntries([entry, ...historyEntries]);
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <Flex align="center" mb={4}>
            <Heading size="xl" color="medical.700">
              Patient Management System
            </Heading>
            <Spacer />
            <Badge colorScheme="blue" fontSize="md" px={3} py={1} borderRadius="full">
              Medical Records
            </Badge>
          </Flex>

          {/* Patient Search Section */}
          <Box
            bg="white"
            p={6}
            borderRadius="xl"
            border="1px"
            borderColor="gray.200"
            shadow="sm"
          >
            <PatientSearch onReservationSelect={handleReservationSelect} />
          </Box>

          {/* Patient Information and History */}
          {selectedReservation && (
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              border="1px"
              borderColor="gray.200"
              shadow="sm"
            >
              <VStack gap={6} align="stretch">
                <PatientInfo reservation={selectedReservation} />
                <PatientSummary historyEntries={historyEntries} />
                <AddHistoryForm 
                  onAddEntry={handleAddHistoryEntry} 
                  reservationId={selectedReservation.id}
                />
                <PatientHistory 
                  entries={historyEntries} 
                  isLoading={isLoading}
                />
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default PatientManagementApp;