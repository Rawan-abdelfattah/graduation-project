import React, { useState } from 'react';
import {
  Box,
  Input,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Spinner,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { doctorClinicService } from 'services/doctorClinicService';

export const PatientSearch = ({ onReservationSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState('name');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const toast = useToast();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    try {
      // TODO: Get doctorId from auth context or props
      const doctorId = 1; // Temporary hardcoded value
      const results = await doctorClinicService.searchPatients(doctorId, searchTerm);
      setSearchResults(results);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to search patients. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

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
    <VStack gap={6} align="stretch">
      <Box>
        <Heading size="md" mb={4} color="medical.700">
          Search Patients
        </Heading>
        <HStack gap={4}>
          <Box position="relative" flex="1">
            <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1}>
              <Search size={20} color="gray" />
            </Box>
            <Input
              placeholder={`Search by ${searchFilter}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              size="lg"
              borderRadius="lg"
              bg="white"
              pl={10}
            />
          </Box>
          <Box minW="150px">
            <select
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                padding: '0 12px',
                width: '100%'
              }}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </Box>
          <Button
            onClick={handleSearch}
            colorScheme="blue"
            size="lg"
            borderRadius="lg"
            px={8}
            loading={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </HStack>
      </Box>

      {isSearching && (
        <Box textAlign="center" py={8}>
          <Spinner size="lg" color="blue.500" />
          <Text mt={2} color="gray.600">Searching patients...</Text>
        </Box>
      )}

      {!isSearching && searchResults.length > 0 && (
        <Box>
          <Box height="1px" bg="gray.200" my={4} />
          <Heading size="sm" mb={4} color="gray.600">
            Search Results ({searchResults.length})
          </Heading>
          <VStack gap={3} align="stretch">
            {searchResults.map((reservation) => (
              <Box
                key={reservation.id}
                bg="white"
                p={4}
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                _hover={{ bg: 'gray.50', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
                cursor="pointer"
                onClick={() => onReservationSelect(reservation)}
                shadow="sm"
              >
                <HStack justify="space-between" align="center">
                  <VStack align="start" gap={1}>
                    <Text fontWeight="bold" fontSize="lg">
                      {reservation.name}
                    </Text>
                    <HStack gap={4} fontSize="sm" color="gray.600">
                      <Text>Email: {reservation.email}</Text>
                      <Text>Phone: {reservation.phone}</Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      Appointment: {reservation.date} at {reservation.time}
                    </Text>
                  </VStack>
                  <VStack align="end" gap={2}>
                    <Badge
                      colorScheme={getStatusColor(reservation.status)}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {getStatusText(reservation.status)}
                    </Badge>
                    <Button size="sm" colorScheme="blue" variant="outline">
                      View History
                    </Button>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      )}

      {!isSearching && searchTerm && searchResults.length === 0 && (
        <Box textAlign="center" py={8}>
          <Text color="gray.500">No patients found matching your search criteria.</Text>
        </Box>
      )}
    </VStack>
  );
};
