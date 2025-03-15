
import { configureStore } from '@reduxjs/toolkit';
// import userSlice from './slices/userSlice';
import screenCategorySlice from './slices/screenCategorySlice';
import doctorTimeTableSlice from './slices/doctorTimeTableSlice';
import doctorPricingSlice from './slices/doctorPricingSlice';
import screenSlice from './slices/screenSlice';
import roomsSlice from './slices/roomsSlice';
import operationsSlice from './slices/operationsSlice';
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
    screenCategory : screenCategorySlice , 
    doctorTimeTable : doctorTimeTableSlice , 
    doctorPricing : doctorPricingSlice , 
    screen : screenSlice,
    rooms : roomsSlice,
    operations : operationsSlice,
  },
});



export default store;
