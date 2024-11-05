import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome, MdLock, } from 'react-icons/md';
import { FaUsers } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineSick } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";

import { RiHealthBookLine } from 'react-icons/ri';
// Admin Imports
import MainDashboard from 'views/admin/default';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import Users from 'views/admin/users/Users';
import ScreenTaps from 'views/admin/screen/ScreenTaps';
import Rooms from 'views/admin/rooms/Rooms';
import UserTabs from 'views/admin/users/UserTabs';
import Specialization from 'views/admin/specialization/Specialization';
import Operations from 'views/admin/operations/Operations';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Users',
    layout: '/admin',
    path: '/users',
    icon: <Icon as={FaUsers} width="20px" height="20px" color="inherit" />,
    component: <UserTabs />,
  },
  {
    name: 'Screen',
    layout: '/admin',
    path: '/screen',
    icon: (
      <Icon as={TbCategoryPlus} width="20px" height="20px" color="inherit" />
    ),
    component: <ScreenTaps />,
  },
  {
    name: 'Rooms',
    layout: '/admin',
    path: '/rooms',
    icon: <Icon as={MdBedroomParent  } width="20px" height="20px" color="inherit" />,
    component: <Rooms />,

  },
  {
    name: 'Operations',
    layout: '/admin',
    path: '/operation',
    icon: <Icon as={MdOutlineSick  } width="20px" height="20px" color="inherit" />,
    component: <Operations />,

  },
  {
    name: 'Specialization',
    layout: '/admin',
    path: '/specialization',
    icon: (
      <Icon as={RiHealthBookLine} width="20px" height="20px" color="inherit" />
    ),
    component: <Specialization />,
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <DataTables />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  },
];

export default routes;
