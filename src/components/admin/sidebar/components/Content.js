// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import Brand from "components/admin/sidebar/components/Brand";
import Links from "components/admin/sidebar/components/Links";
import React from "react";

// FUNCTIONS

function SidebarContent(props) {
  const { AdminRoutes } = props;
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links AdminRoutes={AdminRoutes} />
        </Box>
      </Stack>

      <Box
        mt='60px'
        mb='40px'
        borderRadius='30px'>
      </Box>
    </Flex>
  );
}

export default SidebarContent;
