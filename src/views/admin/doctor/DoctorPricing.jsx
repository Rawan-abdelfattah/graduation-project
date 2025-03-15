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
import DoctorPricingModel from '../default/components/Models/DoctorPricingModel';
import {
  fetchAllDoctorPricingData,
  deleteDoctorPricing,
} from '../../../redux/slices/doctorPricingSlice';
import { SearchIcon } from '@chakra-ui/icons';
import ConfirmDeleteModel from '../default/components/Models/ConfirmDeleteModel';
import { MdDeleteOutline } from 'react-icons/md';
import Loader from 'components/loader/loader';
import { Helmet } from 'react-helmet';
import { Pagination } from 'components/pagination/Pagination';  

const DoctorPricing = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.doctorPricing);
  const colorMode = useColorModeValue('gray', 'gray.400');
  const [page, setPage] = useState(1);
  const toast = useToast(); 

  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorPricingIdToDelete, setDoctorPricingIdToDelete] =
    useState(null);

  useEffect(() => {
    dispatch(fetchAllDoctorPricingData({ page, query }));
  }, [dispatch, page, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDeleteDoctorPricing = () => {
    if (doctorPricingIdToDelete) {
      dispatch(deleteDoctorPricing(doctorPricingIdToDelete))
        .unwrap()
        .then(() => {
          toast({ title: 'Schedule deleted successfully!', status: 'success' })
          dispatch(fetchAllDoctorPricingData({ page: 1 }));
        })
        .catch((e) => {
          console.log(e);
        });
      setIsModalOpen(false);
      setDoctorPricingIdToDelete(null);
    }
  };

  console.log(data?.data);
  

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
          <DoctorPricingModel action="Add" />
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
                Consultation Price  
                </Th>
                <Th textAlign={'center'} color="#fff">
                Consultation Period
                </Th>
                <Th textAlign={'center'} color="#fff">
                Examination Price
                </Th>
                <Th textAlign={'center'} color="#fff">
                Examination Period
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
              ) : data?.length > 0 ? (
                data?.map((row, index) => (
                  <Tr key={row?.id}>
                    <Td textAlign="center">{index + 1}</Td> 
                    <Td textAlign="center" fontWeight="bold">
                      {row?.doctor?.user?.username}
                    </Td>
                    <Td textAlign="center" >
                      {row?.consultationPrice}
                    </Td>
                    <Td textAlign="center">{row?.consultationPeriod}</Td>
                    <Td textAlign="center">{row?.examinationPrice}</Td>
                    <Td textAlign="center">{row?.examinationPeriod}</Td>
                    <Td textAlign="center">
                      <DoctorPricingModel
                        action="Update"
                        doctorPricing={row}
                      />
                    </Td>
                    <Td textAlign="center">
                      <IconButton
                        aria-label="Delete"
                        color="red"
                        onClick={() => {
                          setDoctorPricingIdToDelete(row?.id);
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
          action={handleDeleteDoctorPricing}
        />
      </Container>
    </>
  );
};

export default DoctorPricing;
