import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from 'config/api'; 

export const fetchAllDoctorTimeTableData = createAsyncThunk(
  'doctorTimeTable/fetchAllDoctorTimeTableData',
  async ({ page, query }, thunkAPI) => {
    try {
      const response = await Api.get(
        `/time-table/all/${page}?${query ? 'query=' + query : ''}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllDoctors = createAsyncThunk(
  'doctorTimeTable/fetchAllDoctors',
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
  'doctorTimeTable/fetchOneDoctor',
  async (id, thunkAPI) => {
    try {
      const response = await Api.get(`/doctor/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteDoctorTimeTable = createAsyncThunk(
  'doctorTimeTable/deleteDoctorTimeTable',
  async (id, thunkAPI) => {
    try {
      await Api.delete(`/time-table/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createDoctorTimeTable = createAsyncThunk(
  'doctorTimeTable/createDoctorTimeTable',
  async (data, thunkAPI) => {
    try {
      const response = await Api.post(`/time-table`, data, { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateDoctorTimeTable = createAsyncThunk(
  'doctorTimeTable/updateDoctorTimeTable',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await Api.patch(`/time-table/${id}`, data, { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const doctorTimeTableSlice = createSlice({
  name: 'doctorTimeTable',
  initialState: {
    data: [],
    page: 1,
    loadingTimeTable: false,
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
      .addCase(fetchAllDoctorTimeTableData.pending, (state) => {
        state.loadingTimeTable = true;
        state.error = null;
      })
      .addCase(fetchAllDoctorTimeTableData.fulfilled, (state, action) => {
        state.loadingTimeTable = false;
        state.data = action.payload;
      })
      .addCase(fetchAllDoctorTimeTableData.rejected, (state, action) => {
        state.loadingTimeTable = false;
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
      .addCase(deleteDoctorTimeTable.pending, (state) => {
        state.loadingTimeTable = true;
        state.error = null;
      })
      .addCase(deleteDoctorTimeTable.fulfilled, (state, action) => {
        state.loading = false;
        state.data.data = state.data.data.filter((item) => item.id !== action.payload); 
      })
      
      .addCase(deleteDoctorTimeTable.rejected, (state, action) => {
        state.loadingTimeTable = false; 
      })

      // Create doctor timetable
      .addCase(createDoctorTimeTable.pending, (state) => {
        state.loadingTimeTable = true;
        state.error = null;
      })
      .addCase(createDoctorTimeTable.fulfilled, (state, action) => {
        state.loadingTimeTable = false; 
      })
      .addCase(createDoctorTimeTable.rejected, (state, action) => {
        state.loadingTimeTable = false; 
      }) 
      .addCase(updateDoctorTimeTable.pending, (state) => {
        state.loadingTimeTable = true;
        state.error = null;
      })
      .addCase(updateDoctorTimeTable.fulfilled, (state, action) => {
        state.loadingTimeTable = false;
        
      })
      .addCase(updateDoctorTimeTable.rejected, (state, action) => {
        state.loadingTimeTable = false; 
      });
  },
});

export const { setPage } = doctorTimeTableSlice.actions;
export default doctorTimeTableSlice.reducer;
