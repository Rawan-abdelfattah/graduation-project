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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModel from '../default/components/Models/DeleteModel';
import ScreenCategoryModel from '../default/components/Models/ScreenCategoryModel';
import {
  fetchAllScreenCategoryData,
  deleteScreenCategory,
} from '../../../redux/slices/screenCategorySlice';
import { Helmet } from 'react-helmet';
import { LuCheckSquare, LuFolder, LuUser } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Screen = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.screenCategory);
  const colorMode = useColorModeValue('gray', 'gray.400');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(fetchAllScreenCategoryData({ page, query }));
  }, [dispatch, page, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const delete_screen_category = (id) => {
    dispatch(deleteScreenCategory(id))
      .unwrap()
      .then(() => {
        dispatch(fetchAllScreenCategoryData({ page: 1 }));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      Screen
      {/* <Container maxW="100%">
      
        <HStack display="flex" alignItems="center" justifyContent="space-between">
          <Input
            placeholder="Search"
            maxW={'160px'}
            mb={'12px'}
            value={query}
            onChange={handleSearchChange}
          />
          <ScreenCategoryModel action="Add" />
        </HStack>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error loading data...</p>}
        <TableContainer>
          <Table variant="striped" colorScheme={colorMode}>
            <Thead bg="main">
              <Tr textAlign={'center'} bg="main">
                <Th textAlign={'center'} color="#fff">ID</Th>
                <Th textAlign={'center'} color="#fff">Name</Th>
                <Th textAlign={'center'} color="#fff">Update</Th>
                <Th textAlign={'center'} color="#fff">Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((row) => (
                <Tr key={row?.id}>
                  <Td textAlign={'center'}>{row?.id}</Td>
                  <Td textAlign={'center'}>{row?.name}</Td>
                  <Td textAlign={'center'}>
                    <ScreenCategoryModel action="Update" categoryData={row} />
                  </Td>
                  <Td textAlign={'center'}>
                    <span style={{ cursor: "pointer" }} onClick={() => delete_screen_category(row?.id)}>
                      delete
                    </span>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container> */}
    </>
  );
};

export default Screen;
