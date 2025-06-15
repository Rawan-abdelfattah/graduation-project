import React from 'react';

// Chakra imports
import { Flex, Text, useColorModeValue, Box, Image } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/admin/separator/Separator';

export function SidebarBrand() {
  // Chakra color mode
  let primaryColor = useColorModeValue('green.600', 'green.400');
  let secondaryColor = useColorModeValue('gray.900', 'white');
  let borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex 
      align="center" 
      direction="column" 
      py="20px"
      px="16px"
      w="100%"
    >
      <Box 
        mb="20px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="100%"
      >
        <Text
          as="span"
          color={primaryColor}
          fontWeight="800"
          fontSize="2xl"
          letterSpacing="tight"
          textTransform="uppercase"
          fontFamily="heading"
          _hover={{ transform: 'scale(1.02)' }}
          transition="all 0.2s"
        >
          Doctor
        </Text>
        <Text
          as="span"
          color={secondaryColor}
          fontWeight="800"
          fontSize="2xl"
          letterSpacing="tight"
          textTransform="uppercase"
          fontFamily="heading"
          _hover={{ transform: 'scale(1.02)' }}
          transition="all 0.2s"
        >
          Bot
        </Text>
      </Box>
      <HSeparator 
        my="20px" 
        borderColor={borderColor}
        opacity="0.8"
      />
    </Flex>
  );
}

export default SidebarBrand;
