import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "@/config/api";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";

// Thunk for fetching user data
export const fetchAllUsersData = createAsyncThunk(
  "user/fetchAllUsersData",
  async ({ page, query }, thunkAPI) => {
    console.log("🚀 ~ page, query:", page, query)
    try {
      const response = await Api.get(`/users/all/${page}?${query? "query=" + query:""}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      await Api.delete(`/users/${id}`, {
        withCredentials: true,
      });
      return id; // Return the id of the deleted user for removal from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for creating a user
export const createUser = createAsyncThunk(
  "user/createUser",
  async (data, thunkAPI) => {
    try {
      const response = await Api.post(`/auth/register`, data, {
        withCredentials: true,
      });
      return response.data; // Return the created user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for updating a user
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await Api.patch(`/users/${id}`, data, { withCredentials: true });
      return response.data; // Return the updated user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
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
      .addCase(fetchAllUsersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersData.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchAllUsersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.all = state.all.filter(user => user.id !== action.payload);
        notifySuccess('User deleted successfully'); // Notify success
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.all = [action.payload, ...state.all];
        notifySuccess('User created successfully'); // Notify success
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.all = state.all.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
        notifySuccess('User updated successfully'); // Notify success
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        notifyError(action.payload); // Show error from backend in notifyError
      });
  },
});

export const { setPage } = userSlice.actions;
export default userSlice.reducer;
