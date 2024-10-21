import {
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ChangeUserPassword } from 'views/admin/users/api';
import { notifySuccess } from 'path/to/notify';
import { notifyError } from 'utils/Toastify';

export default function ChangePasswordModal() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const { mutate: mutateChangePassword } = useMutation(ChangeUserPassword, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      notifySuccess('User password changed successfully');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate passwords before mutating
    if (formData.password !== formData.confirmPassword) {
      notifyError("Passwords don't match!");
      return;
    }
    mutateChangePassword(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ModalBody pb={6}>
          <Heading
            color="main"
            as="h6"
            size="lg"
            marginBottom="10px"
            noOfLines={1}
          >
            Change Password
          </Heading>

          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={4}
          >
            <FormControl>
              <FormLabel>Old Password</FormLabel>
              <Input
                name="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Old Password"
              />
            </FormControl>

            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
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
            Change Password
          </Button>
        </ModalFooter>
      </form>
    </div>
  );
}
