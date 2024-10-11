import { Container, HStack, Input, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'

const Users = () => {
  const colorMode = useColorModeValue("gray", "gray.400")

  return (
    <Container maxW="100%">
      <HStack>
        <Input placeholder="Search" maxW={'160px'} mb={'12px'} />
      </HStack>
      <TableContainer>
        <Table variant="striped" colorScheme={colorMode}>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead bg="main">
            <Tr textAlign={'center'} bg="main">
              <Th textAlign={'center'} color="#fff">
                ID
              </Th>
              <Th textAlign={'center'} color="#fff">
                Name
              </Th>
              <Th textAlign={'center'} color="#fff">
                Phone
              </Th>
              <Th textAlign={'center'} color="#fff">
                National ID
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign={'center'}>inches</Td>
              <Td textAlign={'center'}>millimetres (mm)</Td>
              <Td textAlign={'center'} isNumeric>
                25.4
              </Td>
              <Td textAlign={'center'} isNumeric>
                25.4
              </Td>
            </Tr>
            <Tr>
              <Td textAlign={'center'}>inches</Td>
              <Td textAlign={'center'}>millimetres (mm)</Td>
              <Td textAlign={'center'} isNumeric>
                25.4
              </Td>
              <Td textAlign={'center'} isNumeric>
                25.4
              </Td>
            </Tr>
            <Tr>
              <Td textAlign={'center'}>inches</Td>
              <Td textAlign={'center'}>millimetres (mm)</Td>
              <Td textAlign={'center'} isNumeric>
                25.4
              </Td>
              <Td textAlign={'center'} isNumeric>
                25.4
              </Td>
            </Tr>
            <Tr>
              <Td textAlign={'center'}>inches</Td>
              <Td textAlign={'center'}>millimetres (mm)</Td>
              <Td textAlign={'center'} isNumeric>
                25.4
              </Td>
              <Td textAlign={'center'} isNumeric>
                25.4
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>
            {/* <PaginationRoot count={20} pageSize={2} defaultPage={1}>
              <HStack>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot> */}
          </Tfoot>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Users