import { Container, HStack, Input, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { GetUsers } from './api';

const Users = () => {
  const colorMode = useColorModeValue("gray", "gray.400")
  const [page,setPage]=useState(1)
  const { data, isLoading } = useQuery({
    queryKey: ['user', { page }],
    queryFn: () => GetUsers(page),
    onError:(e)=>{
      console.log(e)
    }
  
  });

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
            {data?.data.map((row) => (
              <Tr>
                <Td textAlign={'center'}>{row?.id}</Td>
                <Td textAlign={'center'}>{row?.username}</Td>
                <Td textAlign={'center'}>25.4</Td>
                <Td textAlign={'center'}>{row?.nationalId}</Td>
              </Tr>
            ))}
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