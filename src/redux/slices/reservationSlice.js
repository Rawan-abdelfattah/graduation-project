import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservations: [],
  loading: false,
  error: null,
  success: false
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    createReservationStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createReservationSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.reservations.push(action.payload);
    },
    createReservationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetReservationState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  }
});

export const {
  createReservationStart,
  createReservationSuccess,
  createReservationFailure,
  resetReservationState
} = reservationSlice.actions;

export default reservationSlice.reducer; 