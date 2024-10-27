import {
  Container,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Flex,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { DeleteRole, DeleteSpecialization, GetRoles, GetSpecialization, GetUsers } from './api';

import DeleteModel from '../default/components/Models/DeleteModel';
import ReactPaginate from 'react-paginate';
import { SearchIcon } from '@chakra-ui/icons';
import RolesModel from '../default/components/Models/RolesModel';
import SpecializationModel from '../default/components/Models/SpecializationModel';

const Specialization = () => {
  const colorMode = useColorModeValue('gray', 'gray.400');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['spatialization', { page, query }],
    queryFn: () => GetSpecialization(page, query),
    onError: (e) => {
      console.error(e);
    },
  });

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  const handleSearch = () => {
    setQuery(search);
    setPage(1); // Reset to the first page on new search
  };

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Container maxW="100%">
      <HStack
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Flex>
          <Input
            variant="flushed"
            placeholder="Search"
            maxW={'160px'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton
            color="main"
            backgroundColor="transparent"
            onClick={handleSearch}
            aria-label="Search"
          >
            <SearchIcon />
          </IconButton>
        </Flex>
        <SpecializationModel
          action="Add"
          inputs={{
            name: '',
            arName: '',
          }}
        />
      </HStack>
      <TableContainer>
        <Table variant="striped" colorScheme={colorMode}>
          <Thead bg="main">
            <Tr textAlign={'center'}>
              <Th textAlign={'center'} color="#fff">
                ID
              </Th>
              <Th textAlign={'center'} color="#fff">
                Name
              </Th>
              <Th textAlign={'center'} color="#fff">
                arName
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
            {data?.data?.map((row) => (
              <Tr key={row.id}>
                <Td textAlign={'center'}>{row?.id}</Td>
                <Td textAlign={'center'}>{row?.name}</Td>
                <Td textAlign={'center'}>{row?.arName}</Td>

                <Td textAlign={'center'}>
                  <SpecializationModel
                    action="Update"
                    id={row?.id}
                    inputs={{
                      name: row?.name,
                      arName: row?.arName,
                    }}
                  />
                </Td>
                <Td textAlign={'center'}>
                  <DeleteModel
                    id={row?.id}
                    fun={DeleteSpecialization}
                    name="spatialization"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex justifyContent="center" mt={4}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={data ? Math.ceil(data.count / 10) : 0}
            previousLabel="<"
            containerClassName="pagination"
            activeClassName="active"
            previousClassName="previous"
            nextClassName="next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName="previous-link"
            nextLinkClassName="next-link"
            breakLinkClassName="break-link"
          />
        </Flex>
      </TableContainer>

      <style jsx>{`
        .pagination {
          display: flex;
          list-style: none;
          padding: 0;
        }
        .page-item {
          margin: 0 5px;
        }
        .page-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border: 1px solid #ccc;
          border-radius: 50%;
          text-decoration: none;
          color: #333;
        }
        .active .page-link {
          background-color: #3b8f4f; /* Chakra's blue */
          color: white;
        }
        .page-link:hover {
          background-color: #3b8f4f;
          opacity: 0.8; /* Light gray */
        }
        .previous-link,
        .next-link {
          margin: 0 10px;
        }
      `}</style>
    </Container>
  );
};

export default Specialization;
