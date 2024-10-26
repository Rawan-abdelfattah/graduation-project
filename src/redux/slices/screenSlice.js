import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "config/api";
import { notifyError } from "utils/Toastify";
import { notifySuccess } from "utils/Toastify";
  
// Thunk for fetching screen data
export const fetchAllScreenData = createAsyncThunk(
  "screen/fetchAllScreenData",
  async ({page,query}, thunkAPI) => {
    try {
      const response = await Api.get(`/screen/${page}?${query? "query=" + query:""}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a screen
export const deleteScreen = createAsyncThunk(
  "screen/deleteScreen",
  async (id, thunkAPI) => {
    try {
      await Api.delete(`/screen/${id}`, {
        withCredentials: true,
      });
      return id; // Return the id of the deleted screen for removal from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for creating a screen
export const createScreen = createAsyncThunk(
  "screen/createScreen",
  async (data, thunkAPI) => {
    try {
      const response = await Api.post(`/screen`, data, {
        withCredentials: true,
      });
      return response.data; // Return the created screen data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for updating a screen
export const updateScreen = createAsyncThunk(
  'screen/updateScreen',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await Api.put(`/screen/${id}`, data, { withCredentials: true });
      return response.data;  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// screen slice
const screenCategorySlice = createSlice({
  name: "screen",
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
      .addCase(fetchAllScreenData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllScreenData.fulfilled, (state, action) => {
        state.loading = false;
        state.data= action.payload

       })
      .addCase(fetchAllScreenData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteScreen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteScreen.fulfilled, (state, action) => {
        state.loading = false;
         notifySuccess('screen deleted successfully'); // Notify success
      })
      .addCase(deleteScreen.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(createScreen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createScreen.fulfilled, (state, action) => {
        state.loading = false;
         notifySuccess('screen created successfully'); // Notify success
      })
      .addCase(createScreen.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(updateScreen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateScreen.fulfilled, (state, action) => {
        state.loading = false;
        notifySuccess('screen updated successfully'); // Notify success
      })
      .addCase(updateScreen.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      });
  },
});

export const { setPage } = screenCategorySlice.actions;
export default screenCategorySlice.reducer;
