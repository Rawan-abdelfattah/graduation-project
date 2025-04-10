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
  IconButton,useToast
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import DoctorTimeTableModel from '../default/components/Models/DoctorTimeTableModel';
import {
  fetchAllDoctorTimeTableData,
  deleteDoctorTimeTable,
} from '../../../redux/slices/doctorTimeTableSlice';
import { SearchIcon } from '@chakra-ui/icons';
import ConfirmDeleteModel from '../default/components/Models/ConfirmDeleteModel';
import { MdDeleteOutline } from 'react-icons/md';
import Loader from 'components/admin/loader/loader';
import { Helmet } from 'react-helmet';
import { Pagination } from 'components/admin/pagination/Pagination';  

const DoctorTimeTable = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.doctorTimeTable);
  const colorMode = useColorModeValue('gray', 'gray.400');
  const [page, setPage] = useState(1);
  const toast = useToast(); 

  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorTimeTableIdToDelete, setDoctorTimeTableIdToDelete] =
    useState(null);

  useEffect(() => {
    dispatch(fetchAllDoctorTimeTableData({ page, query }));
  }, [dispatch, page, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDeleteDoctorTimeTable = () => {
    if (doctorTimeTableIdToDelete) {
      dispatch(deleteDoctorTimeTable(doctorTimeTableIdToDelete))
        .unwrap()
        .then(() => {
          toast({ title: 'Schedule deleted successfully!', status: 'success' })
          dispatch(fetchAllDoctorTimeTableData({ page: 1 }));
        })
        .catch((e) => {
          console.log(e);
        });
      setIsModalOpen(false);
      setDoctorTimeTableIdToDelete(null);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Doctors Time-Table</title>
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
          <DoctorTimeTableModel action="Add" />
        </HStack>

        <TableContainer>
          <Table variant="striped" colorScheme={colorMode}>
            <Thead bg="main">
              <Tr textAlign={'center'}>
                <Th textAlign={'center'} color="#fff">
                  #
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Doctor Name
                </Th>
                <Th textAlign={'center'} color="#fff">
                Specialization  
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Day
                </Th>
                <Th textAlign={'center'} color="#fff">
                  Start Time
                </Th>
                <Th textAlign={'center'} color="#fff">
                  End Time
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
                  <Td colSpan={8} textAlign="center">
                    <Loader active={loading} />
                  </Td>
                </Tr>
              ) : data?.data?.length > 0 ? (
                data.data.map((row, index) => (
                  <Tr key={row?.id}>
                    <Td textAlign="center">{index + 1}</Td> 
                    <Td textAlign="center" fontWeight="bold">
                      {row?.doctor.user?.name}
                    </Td>
                    <Td textAlign="center" >
                      {row?.doctor.specialization.name}
                    </Td>
                    <Td textAlign="center">{row?.day}</Td>
                    <Td textAlign="center">{row?.startTime}</Td>
                    <Td textAlign="center">{row?.endTime}</Td>
                    <Td textAlign="center">
                      <DoctorTimeTableModel
                        action="Update"
                        doctorTimeTable={row}
                      />
                    </Td>
                    <Td textAlign="center">
                      <IconButton
                        aria-label="Delete"
                        color="red"
                        onClick={() => {
                          setDoctorTimeTableIdToDelete(row?.id);
                          setIsModalOpen(true);
                        }}
                      >
                        <MdDeleteOutline fontSize="25px" />
                      </IconButton>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    No Data Available
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
          <Pagination data={data} onPageChange={(page) => setPage(page)} />
        </TableContainer>
        <ConfirmDeleteModel
          isOpen={isModalOpen}
          onOpen={() => setIsModalOpen(true)}
          onClose={() => setIsModalOpen(false)}
          action={handleDeleteDoctorTimeTable}
        />
      </Container>
    </>
  );
};

export default DoctorTimeTable;
