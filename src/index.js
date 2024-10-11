import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/App.css';
import "./config/translation"
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from 'config/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import persistStore from 'redux-persist/es/persistStore';
import store from './redux/store';
const queryClient = new QueryClient(); 
const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( 
  <BrowserRouter>
      <Provider store={store}>

      <PersistGate persistor={persistor}> 

   <QueryClientProvider client={queryClient}>

    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
   </QueryClientProvider>
      </PersistGate>
      </Provider>
  </BrowserRouter>,
);
