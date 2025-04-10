import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import OperationsModel from '../default/components/Models/OperationsModel';
import {
  fetchAllOperationsData,
  deleteOperations,
} from '../../../redux/slices/operationsSlice';
import { SearchIcon } from '@chakra-ui/icons';
import ConfirmDeleteModel from '../default/components/Models/ConfirmDeleteModel';
import { MdDeleteOutline } from 'react-icons/md';
import Loader from 'components/admin/loader/loader';
import { Helmet } from 'react-helmet';
import { Pagination } from 'components/admin/pagination/Pagination';

const Operations = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.operations);
  const colorMode = useColorModeValue('gray', 'gray.400');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryIdToDelete, setRoomIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOperationsData({ page, query }));
  }, [dispatch, page, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDeleteRoom = () => {
    if (categoryIdToDelete) {
      dispatch(deleteOperations(categoryIdToDelete))
        .unwrap()
        .then(() => {
          dispatch(fetchAllOperationsData({ page: 1 }));
        })
        .catch((e) => {
          console.log(e);
        });
      setIsModalOpen(false);
      setRoomIdToDelete(null);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Operations</title>
      </Helmet>
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
              onChange={handleSearchChange}
            />
            <IconButton
              color="main"
              backgroundColor="transparent"
              aria-label="Search"
            >
              <SearchIcon />
            </IconButton>
          </Flex>
          <OperationsModel action="Add" />
        </HStack>

        <TableContainer>
          <Table variant="striped" colorScheme={colorMode}>
            <Thead bg="main">
              <Tr>
                <Th textAlign="center" color="#fff">
                  #
                </Th>
                <Th textAlign="center" color="#fff">
                  Name
                </Th>
                <Th textAlign="center" color="#fff">
                  Arabic Name
                </Th>
                <Th textAlign="center" color="#fff">
                  Specialization
                </Th>
                <Th textAlign="center" color="#fff">
                  Update
                </Th>
                <Th textAlign="center" color="#fff">
                  Delete
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <Tr>
                  <Td colSpan={6} textAlign="center">
                    <Loader active={loading} />
                  </Td>
                </Tr>
              ) : (
                data?.data?.map((row, index) => (
                  <Tr key={row?.id}>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td textAlign="center">{row?.name}</Td>
                    <Td textAlign="center">{row?.arName}</Td>
                    <Td textAlign="center">{row?.specialization?.name}</Td>
                    <Td textAlign="center">
                      <OperationsModel action="Update" operations={row} />
                    </Td>
                    <Td textAlign="center">
                      <IconButton
                        aria-label="Delete"
                        color="red"
                        onClick={() => {
                          setRoomIdToDelete(row?.id);
                          setIsModalOpen(true);
                        }}
                        icon={<MdDeleteOutline fontSize="25px" />}
                      />
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>

          {/* Pagination */}
          <Pagination data={data} onPageChange={(page) => setPage(page)} />
        </TableContainer>

        <ConfirmDeleteModel
          isOpen={isModalOpen}
          onOpen={() => setIsModalOpen(true)}
          onClose={() => setIsModalOpen(false)}
          action={handleDeleteRoom}
        />
      </Container>
    </>
  );
};

export default Operations;
