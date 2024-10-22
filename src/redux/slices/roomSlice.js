import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "@/config/api"; // Keep all imports at the top
import { notifyError, notifySuccess } from "@/components/toastify/toastify";

// Thunk for fetching room data
export const fetchAllRoomsData = createAsyncThunk(
  "room/fetchAllRoomsData",
  async ({page,query}, thunkAPI) => {
    try {
      const response = await Api.get(`/rooms/all/${page}?${query? "query=" + query:""}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a room
export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async (id, thunkAPI) => {
    try {
      await Api.delete(`/rooms/${id}`, {
        withCredentials: true,
      });
      return id; // Return the id of the deleted room for removal from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for creating a room
export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (data, thunkAPI) => {
    try {
      const response = await Api.post(`/rooms`, data, {
        withCredentials: true,
      });
      return response.data; // Return the created room data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for updating a room
export const updateRoom = createAsyncThunk(
  'room/updateRoom',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await Api.patch(`/rooms/${id}`, data, { withCredentials: true });
      return response.data;  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Room slice
const roomSlice = createSlice({
  name: "room",
  initialState: {
    all: [],
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
        state.all = action.payload;
      })
      .addCase(fetchAllRoomsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
         notifySuccess('Room deleted successfully'); // Notify success
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.loading = false;
         notifySuccess('Room created successfully'); // Notify success
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        notifySuccess('Room updated successfully'); // Notify success
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      });
  },
});

export const { setPage } = roomSlice.actions;
export default roomSlice.reducer;
