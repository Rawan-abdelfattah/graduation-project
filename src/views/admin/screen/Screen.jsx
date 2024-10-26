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
import ReactPaginate from 'react-paginate';
import Loader from 'components/loader/loader';

const Screen = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.screen);
  const colorMode = useColorModeValue('gray', 'gray.400');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling modal visibility
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null); // Store ID of category to delete

  useEffect(() => {
    dispatch(fetchAllScreenData({ page, query }));
  }, [dispatch, page, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDeleteCategory = () => {
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
      setCategoryIdToDelete(null); 
    }
  };
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  console.log(loading);
  


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
                  ID
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Name
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
      <Td colSpan={4} textAlign="center">
        <Loader active={loading} />
      </Td>
    </Tr>
  ) : (
    data?.data?.map((row) => (
      <Tr key={row?.id}>
        <Td textAlign={'center'}>{row?.id}</Td>
        <Td textAlign={'center'}>{row?.name}</Td>
        <Td textAlign={'center'}>
          <ScreenModel action="Update" categoryData={row} />
        </Td>
        <Td textAlign={'center'}>
          <IconButton
            aria-label="Delete"
            color="red"
            onClick={() => {
              setCategoryIdToDelete(row?.id); // Set the ID of the category to delete
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
          <Flex justifyContent="center" mt={4}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={data?.count}
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
        <ConfirmDeleteModel
          isOpen={isModalOpen}
          onOpen={() => setIsModalOpen(true)}
          onClose={() => setIsModalOpen(false)}
          action={handleDeleteCategory}
        />
      </Container>
    </>
  );
};

export default Screen;
