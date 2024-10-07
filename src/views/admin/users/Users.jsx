import { Container, HStack, Input, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'

const Users = () => {
  const colorMode = useColorModeValue("gray", "gray.400")

  return (
    <Container maxW='100%' mt={"5rem"}>
      <HStack>
        <Input placeholder='Search' maxW={"160px"} mb={"12px"} borderColor={"main"} />
      </HStack>
      <TableContainer>
        <Table variant='striped' colorScheme={colorMode}>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead bg="main">
            <Tr textAlign={"center"} bg="main">
              <Th textAlign={"center"} color="#fff">ID</Th>
              <Th textAlign={"center"} color="#fff">Name</Th>
              <Th textAlign={"center"} color="#fff">Phone</Th>
              <Th textAlign={"center"} color="#fff">National ID</Th>
            </Tr>
          </Thead>
          <Tbody >
            <Tr >
              <Td textAlign={"center"}>inches</Td>
              <Td textAlign={"center"}>millimetres (mm)</Td>
              <Td textAlign={"center"} isNumeric>25.4</Td>
              <Td textAlign={"center"} isNumeric>25.4</Td>
            </Tr>
            <Tr >
              <Td textAlign={"center"}>inches</Td>
              <Td textAlign={"center"}>millimetres (mm)</Td>
              <Td textAlign={"center"} isNumeric>25.4</Td>
              <Td textAlign={"center"} isNumeric>25.4</Td>
            </Tr>
            <Tr >
              <Td textAlign={"center"}>inches</Td>
              <Td textAlign={"center"}>millimetres (mm)</Td>
              <Td textAlign={"center"} isNumeric>25.4</Td>
              <Td textAlign={"center"} isNumeric>25.4</Td>
            </Tr>
            <Tr >
              <Td textAlign={"center"}>inches</Td>
              <Td textAlign={"center"}>millimetres (mm)</Td>
              <Td textAlign={"center"} isNumeric>25.4</Td>
              <Td textAlign={"center"} isNumeric>25.4</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Container>

  )
}

export default Users