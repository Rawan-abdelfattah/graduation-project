
import { configureStore } from '@reduxjs/toolkit';
// import userSlice from './slices/userSlice';
// import roomSlice from './slices/roomSlice';
import modeSlice from './slices/modeSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logedUserSlice from './slices/logedUserSlice';

// Config for mode slice
const persistConfigMode = {
  key: 'mode',
  storage,
};

// Config for logged user slice
const persistConfigLogedUser = {
  key: 'auth',
  storage,
};

// const persistedModeSlice = persistReducer(persistConfigMode, modeSlice);
const persistedLogedUserSlice = persistReducer(
  persistConfigLogedUser,
  logedUserSlice,
);

const store = configureStore({
  reducer: {
    // userSlice,
    // roomSlice,
    // modeSlice: persistedModeSlice,
    logedUserSlice: persistedLogedUserSlice,
  },
});

export const persistor = persistStore(store);

export default store;
