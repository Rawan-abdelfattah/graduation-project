import React, { useState } from 'react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import { icons } from 'views/admin/users/api';

import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import { GetPermission } from 'views/admin/users/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetScreens } from 'views/admin/users/api';
import { SavePermission } from 'views/admin/users/api';
import { notifySuccess } from 'utils/Toastify';
import { notifyError } from 'utils/Toastify';

export default function PermissionModel({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [checked, setChecked] = useState([]);

  const [expanded, setExpanded] = useState([]);
  const [nodes, setNodes] = useState([]);
  const { data: permissionData } = useQuery({
    queryKey: ['permission', { id }],
    queryFn: () => GetPermission(id),
    onSuccess: (data) => {
      setChecked(data.map((ele) => `${ele?.screenId},${ele?.actionId},${ele?.action?.name}`));
    },

    onError: (e) => {
      console.error(e);
    },
  });
  const { data: screenData } = useQuery({
    queryKey: ['screen'],
    queryFn: () => GetScreens(),
    onSuccess: (data) => {
      setNodes(data?.map((screen) => TreeConstrute(screen)));
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const queryClient = useQueryClient();
  const { mutate: mutateSave } = useMutation({
    mutationFn: SavePermission,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['permission'],
      });
      notifySuccess('permission has been saved');
      onClose();
    },
    onError: (e) => {
      e?.response?.data?.message?.forEach((error) => {
        notifyError(error);
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = checked.reduce((prev, next) => {
      const [screenid, actionid, name] = next.split(',');
      const data = prev.find((ele) => ele.id === parseInt(screenid));

      if (data) {
        // If the screen already exists, push the action to its actions array
        data.actions.push({ id: parseInt(actionid), name: name });
      } else {
        // If the screen doesn't exist, create a new object with actions
        prev.push({ id: parseInt(screenid), actions: [{ id: parseInt(actionid), name: name }] });
      }

      return prev;
    }, []);
    console.log("data", data)

    mutateSave({ id, screen: data });
  };

  const TreeConstrute = (screen) => {
    const treeData = {
      value: `${screen.name}-${screen.id}`, // Use a unique combination for value
      label: screen.name,
      id: screen.id,
    };

    if (screen.screen) {
      treeData['children'] = screen.screen.map((ele) => TreeConstrute(ele))
    } else if (screen.actions) {
      treeData['children'] = screen.actions.map((ele) => ({
        value: [screen.id, ele.id, ele.name], // Make actions unique too
        label: ele.name,
        id: ele.id,
      }));
    }

    return treeData;
  };
  return (
    <>
      <IconButton
        onClick={onOpen}
        color="main"
        backgroundColor="transparent"
        fontSize="20px"
      >
        <FaRegEdit />
      </IconButton>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        borderRadius="10px"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="30px" fontWeight="bold">
            {/* <IoPersonAddOutline style={{ color: 'green' }} /> */}
            User Permission
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start', // Align to the left
                  padding: '20px',
                  maxWidth: '300px',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                <CheckboxTree
                  nodes={nodes}
                  checked={checked}
                  expanded={expanded}
                  onCheck={(checked) => setChecked(checked)}
                  onExpand={(expanded) => setExpanded(expanded)}
                  icons={icons}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                />
              </div>
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
