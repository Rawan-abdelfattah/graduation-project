import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { LuCheckSquare,  LuUser } from 'react-icons/lu';
import Users from './Users';
import Roles from '../roles/Roles';


const UserTabs = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Users </title>
      </Helmet>
      <Tabs defaultIndex={0} variant="enclosed">
        <TabList  >
          <Tab>
            <LuUser /> Users
          </Tab>
          <Tab>
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
