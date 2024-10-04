"use client"; 
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import roomSlice from './slices/roomSlice';
import modeSlice from './slices/modeSlice';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedModeSlice = persistReducer(persistConfig, modeSlice);

const store = configureStore({
  reducer: { 
    userSlice,
    roomSlice,
    modeSlice : persistedModeSlice,

    
   },
});

export default store;
