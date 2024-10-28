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
import RoomsModel from '../default/components/Models/RoomsModel';
import {
  fetchAllRoomsData,
  deleteRooms,
} from '../../../redux/slices/roomsSlice';
import { SearchIcon } from '@chakra-ui/icons';
import ConfirmDeleteModel from '../default/components/Models/ConfirmDeleteModel';
import { MdDeleteOutline } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import Loader from 'components/loader/loader';
import { Helmet } from 'react-helmet';
import { Pagination } from 'components/pagination/Pagination';

const Rooms = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.rooms);
  const colorMode = useColorModeValue('gray', 'gray.400');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryIdToDelete, setRoomIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllRoomsData({ page, query }));
  }, [dispatch, page, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDeleteRoom = () => {
    if (categoryIdToDelete) {
      dispatch(deleteRooms(categoryIdToDelete))
        .unwrap()
        .then(() => {
          dispatch(fetchAllRoomsData({ page: 1 }));
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
        <title>Rooms</title>
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
          <RoomsModel action="Add" />
        </HStack>

        <TableContainer>
          <Table variant="striped" colorScheme={colorMode}>
            <Thead bg="main">
              <Tr textAlign={'center'}>
                <Th textAlign={'center'} color="#fff">
                  #
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Room No
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Type
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Status
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Beds
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Companion No
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Degree
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Update
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Delete
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <Tr>
                  <Td colSpan={9} textAlign="center">
                    <Loader active={loading} />
                  </Td>
                </Tr>
              ) : (
                data?.data?.map((row, index) => (
                  <Tr key={row?.id}>
                    <Td textAlign={'center'}>{index + 1}</Td>
                    <Td textAlign={'center'}>{row.roomNo}</Td>
                    <Td textAlign={'center'}>{row.type}</Td>
                    <Td textAlign={'center'}>{row.status}</Td>
                    <Td textAlign={'center'}>{row.beds}</Td>
                    <Td textAlign={'center'}>{row.companionNo}</Td>
                    <Td textAlign={'center'}>{row.degree}</Td>
                    <Td textAlign={'center'}>
                      <RoomsModel action="Update" rooms={row} />
                    </Td>
                    <Td textAlign={'center'}>
                      <IconButton
                        aria-label="Delete"
                        color="red"
                        onClick={() => {
                          setRoomIdToDelete(row?.id);
                          setIsModalOpen(true);
                        }}
                      >
                        <MdDeleteOutline fontSize="25px" />
                      </IconButton>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
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

export default Rooms;
