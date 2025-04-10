import React from 'react';

// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/admin/icons/Icons';
import { HSeparator } from 'components/admin/separator/Separator';

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex align="center" direction="column">
      <Text color={logoColor} fontWeight={700} fontSize={'3xl'}>
        Alahy  
        <Text fontWeight={'500'} display={'inline-block'}>
          Hospital
        </Text>  
      </Text>
      <HSeparator my="20px" />
    </Flex>
  );
}

export default SidebarBrand;
