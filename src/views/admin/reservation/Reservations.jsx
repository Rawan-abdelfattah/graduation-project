import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Container,
  Tbody,
  Tr,
  Th,
  Td,
  InputGroup,
  InputLeftElement,
  Flex,
  Text,
  HStack,
  Input,
  Button,
  TableContainer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../../../redux/slices/reservationSlice';
import { Helmet } from 'react-helmet';
import Api from 'config/api';
import Loader from 'components/admin/loader/loader';

const Reservations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const toast = useToast();

  const dispatch = useDispatch();
  const {
    reservations = [],
    loading,
    error,
    pagination = { count: 0, currentPage: 1 },
  } = useSelector((state) => state.reservation || {});

  useEffect(() => {
    dispatch(fetchReservations({ page: currentPage, query: searchQuery }));
  }, [dispatch, currentPage, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingStatus(id);
      await Api.patch(`/reservation/${id}/status`, { status: newStatus });
      dispatch(fetchReservations({ page: currentPage, query: searchQuery }));
      toast({
        title: 'Status updated',
        description: 'Reservation status has been updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update reservation status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (error) return <Box>Error: {error}</Box>;

  const totalPages = Math.ceil(pagination.count / 10);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Operations</title>
      </Helmet>
      <Container maxW="100%">
        {' '}
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
              onChange={handleSearch}
            />
            <IconButton
              color="main"
              backgroundColor="transparent"
              aria-label="Search"
            >
              <SearchIcon />
            </IconButton>
          </Flex>
        </HStack>
        <TableContainer 
          borderRadius="lg" 
          boxShadow="sm" 
          bg="white" 
          p={4}
          position="relative"
        >
          {loading && (
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg="rgba(255, 255, 255, 0.8)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex="1"
              borderRadius="lg"
            >
              <Loader active={loading} />
            </Box>
          )}
          <Table variant="simple">
            <Thead bg="main">
              <Tr>
                <Th textAlign="center" color="#fff" py={4}>
                  Name
                </Th>
                <Th textAlign="center" color="#fff" py={4}>
                  Email
                </Th>
                <Th textAlign="center" color="#fff" py={4}>
                  Phone
                </Th>
                <Th textAlign="center" color="#fff" py={4}>
                  Date
                </Th>
                <Th textAlign="center" color="#fff" py={4}>
                  Time
                </Th>
                <Th textAlign="center" color="#fff" py={4}>
                  Status
                </Th>
                <Th textAlign="center" color="#fff" py={4}>
                  Notes
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservations?.map((reservation) => (
                <Tr
                  key={reservation.id}
                  _hover={{ bg: 'gray.50' }}
                  transition="all 0.2s"
                >
                  <Td textAlign="center" py={4}>
                    {reservation.name}
                  </Td>
                  <Td textAlign="center" py={4}>
                    {reservation.email}
                  </Td>
                  <Td textAlign="center" py={4}>
                    {reservation.phone}
                  </Td>
                  <Td textAlign="center" py={4}>
                    {new Date(reservation.date).toLocaleDateString()}
                  </Td>
                  <Td textAlign="center" py={4}>
                    {reservation.time}
                  </Td>
                  <Td textAlign="center" py={4}>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        size="sm"
                        isLoading={updatingStatus === reservation.id}
                        loadingText="Updating..."
                        bg={
                          reservation.status === 'PENDING'
                            ? 'yellow.100'
                            : reservation.status === 'CONFIRMED'
                            ? 'green.100'
                            : reservation.status === 'CANCELLED'
                            ? 'red.100'
                            : 'gray.100'
                        }
                        color={
                          reservation.status === 'PENDING'
                            ? 'yellow.800'
                            : reservation.status === 'CONFIRMED'
                            ? 'green.800'
                            : reservation.status === 'CANCELLED'
                            ? 'red.800'
                            : 'gray.800'
                        }
                        _hover={{
                          bg:
                            reservation.status === 'PENDING'
                              ? 'yellow.200'
                              : reservation.status === 'CONFIRMED'
                              ? 'green.200'
                              : reservation.status === 'CANCELLED'
                              ? 'red.200'
                              : 'gray.200',
                        }}
                      >
                        {reservation.status}
                      </MenuButton>
                      <MenuList>
                        <MenuItem 
                          onClick={() => handleStatusChange(reservation.id, 'PENDING')}
                          isDisabled={updatingStatus === reservation.id}
                        >
                          PENDING
                        </MenuItem>
                        <MenuItem 
                          onClick={() => handleStatusChange(reservation.id, 'CONFIRMED')}
                          isDisabled={updatingStatus === reservation.id}
                        >
                          CONFIRMED
                        </MenuItem>
                        <MenuItem 
                          onClick={() => handleStatusChange(reservation.id, 'CANCELLED')}
                          isDisabled={updatingStatus === reservation.id}
                        >
                          CANCELLED
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                  <Td
                    textAlign="center"
                    py={4}
                    maxW="200px"
                    whiteSpace="normal"
                  >
                    {reservation.notes || 'No notes'}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justify="space-between" align="center" mt={4}>
          <Text>
            Showing {reservations.length} of {pagination.count} reservations
          </Text>
          <HStack spacing={2}>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
            <Text>
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </HStack>
        </Flex>
      </Container>
    </>
  );
};

export default Reservations;
