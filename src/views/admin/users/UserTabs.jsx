import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { LuCheckSquare, LuFolder, LuUser } from 'react-icons/lu';
import Users from './Users';
import Roles from '../roles/Roles';


const UserTabs = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Users </title>
      </Helmet>
      <Tabs defaultIndex={0} variant="line">
        <TabList paddingLeft="30px" color="main">
          <Tab display="flex" gap="5px" fontSize="15px">
            <LuUser /> Users
          </Tab>
          <Tab display="flex" gap="5px" fontSize="15px">
            <LuCheckSquare /> Roles
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Users />
          </TabPanel>
          <TabPanel><Roles/></TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default UserTabs;
