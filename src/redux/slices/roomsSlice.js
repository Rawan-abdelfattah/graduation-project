import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "config/api";
import { notifyError } from "utils/Toastify";
import { notifySuccess } from "utils/Toastify";
  
// Thunk for fetching rooms data
export const fetchAllRoomsData = createAsyncThunk(
  "rooms/fetchAllRoomsData",
  async ({page,query}, thunkAPI) => {
    try {
      const response = await Api.get(`/rooms/${page}?${query? "query=" + query:""}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a rooms
export const deleteRooms = createAsyncThunk(
  "rooms/deleteRooms",
  async (id, thunkAPI) => {
    try {
      await Api.delete(`/rooms/${id}`, {
        withCredentials: true,
      });
      return id; // Return the id of the deleted rooms for removal from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for creating a rooms
export const createRooms = createAsyncThunk(
  "rooms/createRooms",
  async (data, thunkAPI) => {
    try {
      const response = await Api.post(`/rooms`, data, {
        withCredentials: true,
      });
      return response.data; // Return the created rooms data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for updating a rooms
export const updateRooms = createAsyncThunk(
  'rooms/updateRooms',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await Api.put(`/rooms/${id}`, data, { withCredentials: true });
      return response.data;  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Rooms slice
const roomsSlice = createSlice({
  name: "rooms",
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
      .addCase(fetchAllRoomsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRoomsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data= action.payload

       })
      .addCase(fetchAllRoomsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRooms.fulfilled, (state, action) => {
        state.loading = false;
         notifySuccess('Rooms deleted successfully'); // Notify success
      })
      .addCase(deleteRooms.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(createRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRooms.fulfilled, (state, action) => {
        state.loading = false;
         notifySuccess('Rooms created successfully'); // Notify success
      })
      .addCase(createRooms.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(updateRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRooms.fulfilled, (state, action) => {
        state.loading = false;
        notifySuccess('Rooms updated successfully'); // Notify success
      })
      .addCase(updateRooms.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      });
  },
});

export const { setPage } = roomsSlice.actions;
export default roomsSlice.reducer;
