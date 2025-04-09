import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import {  LuUser } from 'react-icons/lu';
import { FiCheckSquare } from 'react-icons/fi';
import Screen from './Screen';
import ScreenCategory from './ScreenCategory';

const ScreenTabs = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Screen </title>
      </Helmet>
      <Tabs defaultIndex={0} variant="enclosed">
        <TabList>
          <Tab>
            <LuUser /> Screen
          </Tab>
          <Tab>
            <FiCheckSquare /> Screen Category
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Screen />
          </TabPanel>
          <TabPanel>
            <ScreenCategory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ScreenTabs;
