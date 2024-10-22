import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "config/api";
import { notifyError } from "utils/Toastify";
import { notifySuccess } from "utils/Toastify";
  
// Thunk for fetching screenCategory data
export const fetchAllScreenCategoryData = createAsyncThunk(
  "screenCategory/fetchAllScreenCategoryData",
  async ({page,query}, thunkAPI) => {
    try {
      const response = await Api.get(`/screen-category/${page}?${query? "query=" + query:""}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a screenCategory
export const deleteScreenCategory = createAsyncThunk(
  "screenCategory/deleteScreenCategory",
  async (id, thunkAPI) => {
    try {
      await Api.delete(`/screen-category/${id}`, {
        withCredentials: true,
      });
      return id; // Return the id of the deleted screenCategory for removal from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for creating a screenCategory
export const createScreenCategory = createAsyncThunk(
  "screenCategory/createScreenCategory",
  async (data, thunkAPI) => {
    try {
      const response = await Api.post(`/screen-category`, data, {
        withCredentials: true,
      });
      return response.data; // Return the created screenCategory data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for updating a screenCategory
export const updateScreenCategory = createAsyncThunk(
  'screenCategory/updateScreenCategory',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await Api.put(`/screen-category/${id}`, data, { withCredentials: true });
      return response.data;  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ScreenCategory slice
const screenCategorySlice = createSlice({
  name: "screenCategory",
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
      .addCase(fetchAllScreenCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllScreenCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.data= action.payload

       })
      .addCase(fetchAllScreenCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteScreenCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteScreenCategory.fulfilled, (state, action) => {
        state.loading = false;
         notifySuccess('ScreenCategory deleted successfully'); // Notify success
      })
      .addCase(deleteScreenCategory.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(createScreenCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createScreenCategory.fulfilled, (state, action) => {
        state.loading = false;
         notifySuccess('ScreenCategory created successfully'); // Notify success
      })
      .addCase(createScreenCategory.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(updateScreenCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateScreenCategory.fulfilled, (state, action) => {
        state.loading = false;
        notifySuccess('ScreenCategory updated successfully'); // Notify success
      })
      .addCase(updateScreenCategory.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      });
  },
});

export const { setPage } = screenCategorySlice.actions;
export default screenCategorySlice.reducer;
