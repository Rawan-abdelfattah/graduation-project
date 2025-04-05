import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from 'config/api'; 

export const fetchAllDoctorPricingData = createAsyncThunk(
  'doctorPricing/fetchAllDoctorPricingData',
  async ({ page, query }, thunkAPI) => {
    try {
      const response = await Api.get(
        `/doctor-session-pricing/${page}?${query ? 'query=' + query : ''}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllDoctors = createAsyncThunk(
  'doctorPricing/fetchAllDoctors',
  async (_, thunkAPI) => {
    try {
      const response = await Api.get(`/doctor/all`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOneDoctor = createAsyncThunk(
  'doctorPricing/fetchOneDoctor',
  async (id, thunkAPI) => {
    try {
      const response = await Api.get(`/doctor/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteDoctorPricing = createAsyncThunk(
  'doctorPricing/deleteDoctorPricing',
  async (id, thunkAPI) => {
    try {
      await Api.delete(`/doctor-session-pricing/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createDoctorPricing = createAsyncThunk(
  'doctorPricing/createDoctorPricing',
  async (data, thunkAPI) => {
    try {
      const response = await Api.post(`/doctor-session-pricing`, data, { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateDoctorPricing = createAsyncThunk(
  'doctorPricing/updateDoctorPricing',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await Api.patch(`/doctor-session-pricing/${id}`, data, { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const doctorPricingSlice = createSlice({
  name: 'doctorPricing',
  initialState: {
    data: [],
    page: 1,
    loadingPricing: false,
    loadingDoctors: false,
    doctors: [],
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder 
      .addCase(fetchAllDoctorPricingData.pending, (state) => {
        state.loadingPricing = true;
        state.error = null;
      })
      .addCase(fetchAllDoctorPricingData.fulfilled, (state, action) => {
        state.loadingPricing = false;
        state.data = action.payload;
      })
      .addCase(fetchAllDoctorPricingData.rejected, (state, action) => {
        state.loadingPricing = false;
        state.error = action.payload;
      })

      // Fetch all doctors
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loadingDoctors = true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.loadingDoctors = false;
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loadingDoctors = false;
        state.error = action.payload;
      })

      // Delete doctor timetable
      .addCase(deleteDoctorPricing.pending, (state) => {
        state.loadingPricing = true;
        state.error = null;
      })
      .addCase(deleteDoctorPricing.fulfilled, (state, action) => {
        state.loading = false;
        state.data.data = state.data.data.filter((item) => item.id !== action.payload); 
      })
      
      .addCase(deleteDoctorPricing.rejected, (state, action) => {
        state.loadingPricing = false; 
      })

      // Create doctor timetable
      .addCase(createDoctorPricing.pending, (state) => {
        state.loadingPricing = true;
        state.error = null;
      })
      .addCase(createDoctorPricing.fulfilled, (state, action) => {
        state.loadingPricing = false; 
      })
      .addCase(createDoctorPricing.rejected, (state, action) => {
        state.loadingPricing = false; 
      }) 
      .addCase(updateDoctorPricing.pending, (state) => {
        state.loadingPricing = true;
        state.error = null;
      })
      .addCase(updateDoctorPricing.fulfilled, (state, action) => {
        state.loadingPricing = false;
        
      })
      .addCase(updateDoctorPricing.rejected, (state, action) => {
        state.loadingPricing = false; 
      });
  },
});

export const { setPage } = doctorPricingSlice.actions;
export default doctorPricingSlice.reducer;
