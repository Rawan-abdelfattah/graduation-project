import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import SparkleEffect from './components/SparkleEffect';

import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';

import {
  ChakraProvider,
  // extendTheme
} from '@chakra-ui/react';

import initialTheme from './theme/theme';
import { useState } from 'react';
import LandingLayout from 'routes/LandingRoutes';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <ChakraProvider theme={currentTheme}>
      <SparkleEffect>
        <Routes>
          <Route path="auth/*" element={<AuthLayout />} />
          <Route
            path="admin/*"
            element={
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            }
          />
          <Route
            path="rtl/*"
            element={
              <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
            }
          />
          <Route path="/*" element={<LandingLayout />} />
        </Routes>
      </SparkleEffect>
    </ChakraProvider>
  );
}
