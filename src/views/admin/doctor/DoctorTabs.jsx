import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { LuCheckSquare } from 'react-icons/lu';
import DoctorTimeTable from './DoctorTimeTable';
import { FaUserDoctor } from 'react-icons/fa6';
import DoctorPricing from './DoctorPricing';

const DoctorTabs = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Doctor </title>
      </Helmet>
      <Tabs defaultIndex={0} variant="enclosed">
        <TabList>
          <Tab>
            <FaUserDoctor /> Doctor Time Table
          </Tab>
          <Tab>
            <LuCheckSquare /> Doctor Pricing
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DoctorTimeTable />
          </TabPanel>
          <TabPanel>
            <DoctorPricing />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default DoctorTabs;
