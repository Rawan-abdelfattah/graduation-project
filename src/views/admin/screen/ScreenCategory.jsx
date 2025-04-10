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
import ScreenCategoryModel from '../default/components/Models/ScreenCategoryModel';
import {
  fetchAllScreenCategoryData,
  deleteScreenCategory,
} from '../../../redux/slices/screenCategorySlice';
import { SearchIcon } from '@chakra-ui/icons';
import ConfirmDeleteModel from '../default/components/Models/ConfirmDeleteModel';
import { MdDeleteOutline } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import Loader from 'components/admin/loader/loader';
import { Pagination } from 'components/admin/pagination/Pagination';

const ScreenCategory = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.screenCategory);
  const colorMode = useColorModeValue('gray', 'gray.400');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllScreenCategoryData({ page, query }));
  }, [dispatch, page, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDeleteCategory = () => {
    if (categoryIdToDelete) {
      dispatch(deleteScreenCategory(categoryIdToDelete))
        .unwrap()
        .then(() => {
          dispatch(fetchAllScreenCategoryData({ page: 1 }));
        })
        .catch((e) => {
          console.log(e);
        });
      setIsModalOpen(false);
      setCategoryIdToDelete(null);
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
          <ScreenCategoryModel action="Add" />
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
                  <Td colSpan={4} textAlign="center">
                    <Loader active={loading} />
                  </Td>
                </Tr>
              ) : (
                data?.data?.map((row, index) => (
                  <Tr key={row?.id}>
                    <Td textAlign={'center'}>{index + 1}</Td>
                    <Td textAlign={'center'}>{row?.name}</Td>
                    <Td textAlign={'center'}>
                      <ScreenCategoryModel action="Update" categoryData={row} />
                    </Td>
                    <Td textAlign={'center'}>
                      <IconButton
                        aria-label="Delete"
                        color="red"
                        onClick={() => {
                          setCategoryIdToDelete(row?.id);
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
        </TableContainer>

        <Pagination data={data} onPageChange={(page) => setPage(page)} />

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

export default ScreenCategory;
