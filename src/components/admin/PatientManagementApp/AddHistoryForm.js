import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { doctorClinicService } from 'services/doctorClinicService';

export const AddHistoryForm = ({ onAddEntry, reservationId }) => {
  const [formData, setFormData] = useState({
    diagnosis: '',
    medication: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.diagnosis.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a diagnosis.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Get doctorId from auth context or props
      const doctorId = 1; // Temporary hardcoded value
      
      const newEntry = await doctorClinicService.addPatientHistory({
        reservationId,
        doctorId,
        diagnosis: formData.diagnosis,
        medication: formData.medication,
        notes: formData.notes,
      });
      
      onAddEntry(newEntry);
      
      setFormData({
        diagnosis: '',
        medication: '',
        notes: '',
      });
      
      toast({
        title: 'Success',
        description: 'History entry added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add history entry. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box>
      <Heading size="md" mb={4} color="medical.700">
        Add New History Entry
      </Heading>
      <Box bg="green.50" border="1px" borderColor="green.200" borderRadius="lg" p={6}>
        <form onSubmit={handleSubmit}>
          <VStack gap={4} align="stretch">
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                Diagnosis *
              </Text>
              <Input
                value={formData.diagnosis}
                onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                placeholder="Enter diagnosis..."
                bg="white"
                borderRadius="lg"
                size="lg"
                required
              />
            </Box>
            
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                Medication
              </Text>
              <Input
                value={formData.medication}
                onChange={(e) => handleInputChange('medication', e.target.value)}
                placeholder="Enter prescribed medication..."
                bg="white"
                borderRadius="lg"
                size="lg"
              />
            </Box>
            
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                Additional Notes
              </Text>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Enter additional notes..."
                bg="white"
                borderRadius="lg"
                size="lg"
                rows={4}
              />
            </Box>
            
            <HStack justify="flex-end" pt={4}>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                borderRadius="lg"
                px={8}
                loading={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Entry'}
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
