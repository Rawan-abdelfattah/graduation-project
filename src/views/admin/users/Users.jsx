import { Container, HStack, Input, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { GetUsers } from './api';
import UserModel from "../default/components/Models/UserModel"
import DeleteModel from '../default/components/Models/DeleteModel';

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
      <HStack display="flex" alignItems="center" justifyContent="space-between">
        <Input placeholder="Search" maxW={'160px'} mb={'12px'} />
        <UserModel action="Add"/>
      </HStack>
      <TableContainer>
        <Table variant="striped" colorScheme={colorMode}>
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
              <Th textAlign={'center'} color="#fff">
                Edit
              </Th>
              <Th textAlign={'center'} color="#fff">
                Delete
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
                <Td textAlign={'center'}><UserModel action="Update" /></Td>

                <Td textAlign={'center'} color="#fff">
                  <DeleteModel />
                </Td>
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