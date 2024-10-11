import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/App.css';
import "./config/translation"
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from 'config/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>,
);
