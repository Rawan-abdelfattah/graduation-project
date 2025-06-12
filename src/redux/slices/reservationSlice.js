import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from 'config/api';

// Async thunks
export const fetchReservations = createAsyncThunk(
  'reservation/fetchAll',
  async ({ page = 1, query }, { rejectWithValue }) => {
    try {
      const response = await Api.get('/reservation', {
        params: {
          page,
          query
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reservations');
    }
  }
);

export const createReservation = createAsyncThunk(
  'reservation/create',
  async (reservationData, { rejectWithValue }) => {
    try {
      const response = await Api.post('/reservation', reservationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create reservation');
    }
  }
);

export const updateReservation = createAsyncThunk(
  'reservation/update',
  async ({ id, ...reservationData }, { rejectWithValue }) => {
    try {
      const response = await Api.put(`/reservation/${id}`, reservationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update reservation');
    }
  }
);

export const deleteReservation = createAsyncThunk(
  'reservation/delete',
  async (id, { rejectWithValue }) => {
    try {
      await Api.delete(`/reservation/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete reservation');
    }
  }
);

const initialState = {
  reservations: [],
  loading: false,
  error: null,
  success: false,
  pagination: {
    count: 0,
    currentPage: 1
  }
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    resetReservationState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch reservations
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload.data;
        state.pagination = {
          count: action.payload.count,
          currentPage: action.meta.arg.page
        };
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create reservation
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Update reservation
      .addCase(updateReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reservations.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete reservation
      .addCase(deleteReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = state.reservations.filter(r => r.id !== action.payload);
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetReservationState } = reservationSlice.actions;

export default reservationSlice.reducer; 