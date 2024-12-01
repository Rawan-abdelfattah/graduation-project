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
import ScreenModel from '../default/components/Models/ScreenModel';
import {
  fetchAllScreenData,
  deleteScreen,
} from '../../../redux/slices/screenSlice';
import { SearchIcon } from '@chakra-ui/icons';
import ConfirmDeleteModel from '../default/components/Models/ConfirmDeleteModel';
import { MdDeleteOutline } from 'react-icons/md';
import Loader from 'components/loader/loader';
import { Pagination } from 'components/pagination/Pagination';

const Screen = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.screen);
  const colorMode = useColorModeValue('gray', 'gray.400');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryIdToDelete, setScreenIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllScreenData({ page, query }));
  }, [dispatch, page, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDeleteScreen = () => {
    if (categoryIdToDelete) {
      dispatch(deleteScreen(categoryIdToDelete))
        .unwrap()
        .then(() => {
          dispatch(fetchAllScreenData({ page: 1 }));
        })
        .catch((e) => {
          console.log(e);
        });
      setIsModalOpen(false);
      setScreenIdToDelete(null);
    }
  };

  return (
    <>
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
          <ScreenModel action="Add" />
        </HStack>

        <TableContainer>
          <Table variant="striped" colorScheme={colorMode}>
            <Thead bg="main">
              <Tr textAlign={'center'} bg="main">
                <Th textAlign={'center'} color="#fff">
                  #
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Name
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Route
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Actions
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
              {loading ? ( // Check if data is still loading
                <Tr>
                  <Td colSpan={6} textAlign="center">
                    <Loader active={loading} />
                  </Td>
                </Tr>
              ) : (
                data?.data?.map((row, index) => (
                  <Tr key={row?.id}>
                    <Td textAlign={'center'}>{index + 1}</Td>
                    <Td textAlign={'center'}>
                      # {row?.screenCategoryId} <br />
                      {row?.name}
                    </Td>
                    <Td textAlign={'center'}>{row?.route}</Td>
                    <Td textAlign="center">
                      {row?.actions?.map((action) => (
                        <span padding={'30px'} key={action.name}>
                          ({action.name}){' '}
                        </span>
                      ))}
                    </Td>
                    <Td textAlign={'center'}>
                      <ScreenModel action="Update" screen={row} />
                    </Td>
                    <Td textAlign={'center'}>
                      <IconButton
                        aria-label="Delete"
                        color="red"
                        onClick={() => {
                          setScreenIdToDelete(row?.id); // Set the ID of the category to delete
                          setIsModalOpen(true); // Open the modal
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
          action={handleDeleteScreen}
        />
      </Container>
    </>
  );
};

export default Screen;
