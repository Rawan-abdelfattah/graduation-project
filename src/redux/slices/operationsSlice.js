import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "config/api";
import { notifyError } from "utils/Toastify";
import { notifySuccess } from "utils/Toastify";
  
// Thunk for fetching operations data
export const fetchAllOperationsData = createAsyncThunk(
  "operations/fetchAllOperationsData",
  async ({page,query}, thunkAPI) => {    
    try {
      const response = await Api.get(`/operation/${page}?${query? "query=" + query:""}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a operations
export const deleteOperations = createAsyncThunk(
  "operations/deleteOperations",
  async (id, thunkAPI) => {
    try {
      await Api.delete(`/operation/${id}`, {
        withCredentials: true,
      });
      return id; // Return the id of the deleted operations for removal from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for creating a operations
export const createOperations = createAsyncThunk(
  "operations/createOperations",
  async (data, thunkAPI) => {
    try {
      const response = await Api.post(`/operation`, data, {
        withCredentials: true,
      });
      return response.data; // Return the created operations data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for updating a operations
export const updateOperations = createAsyncThunk(
  'operations/updateOperations',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await Api.patch(`/operation/${id}`, data, { withCredentials: true });
      return response.data;  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// operations slice
const operationsSlice = createSlice({
  name: "operations",
  initialState: {
    data: [],
    page: 1,
    loading: false,
    error: null
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOperationsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOperationsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data= action.payload

       })
      .addCase(fetchAllOperationsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOperations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOperations.fulfilled, (state, action) => {
        state.loading = false;
         notifySuccess('operations deleted successfully'); // Notify success
      })
      .addCase(deleteOperations.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(createOperations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOperations.fulfilled, (state, action) => {
        state.loading = false;
         notifySuccess('operations created successfully'); // Notify success
      })
      .addCase(createOperations.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(updateOperations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOperations.fulfilled, (state, action) => {
        state.loading = false;
        notifySuccess('operations updated successfully'); // Notify success
      })
      .addCase(updateOperations.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      });
  },
});

export const { setPage } = operationsSlice.actions;
export default operationsSlice.reducer;
