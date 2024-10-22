import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, 
  useDisclosure,
} from '@chakra-ui/react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { updateScreenCategory , createScreenCategory , fetchAllScreenCategoryData} from '../../../../../redux/slices/screenCategorySlice';


export default function ScreenCategoryModel({ action, categoryData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [formData, setFormData] = useState({
    name: categoryData ? categoryData.name : '',
    id: categoryData ? categoryData.id : null, 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }; 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (action === 'Add') {
      dispatch(createScreenCategory({ name: formData.name })).unwrap().then(()=>{
        dispatch(fetchAllScreenCategoryData({ page : 1}));
        onClose();
     }).catch((e)=>{console.log(e)});
   } else if (action === 'Update') {
      dispatch(updateScreenCategory({id : categoryData?.id  , data : formData})).unwrap().then(()=>{
        dispatch(fetchAllScreenCategoryData({ page : 1}));

         onClose();
      }).catch((e)=>{console.log(e)})
    } 
   
  };

  return (
    <>
      <Button backgroundColor="main" color="white" onClick={onOpen}>
        {action === 'Add' ? 'Add' : <FaRegEdit />}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        borderRadius="10px"
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="5px"
            fontSize="30px"
            fontWeight="bold"
          >
            <IoPersonAddOutline color="main" />
            {action === 'Add' ? 'Add' : 'Update'} Screen Category
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              {action === 'Update' && (
                <Heading
                  color="main"
                  as="h6"
                  size="lg"
                  marginBottom="10px"
                  noOfLines={1}
                >
                  Screen Category data
                </Heading>
              )}
              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
                gap={4}
              >
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Name"
                  />
                </FormControl>     
              </Grid>
            </ModalBody>
 
            <ModalFooter>
              <Button
                backgroundColor="main"
                colorScheme="green"
                type="submit"
                mr={3}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
