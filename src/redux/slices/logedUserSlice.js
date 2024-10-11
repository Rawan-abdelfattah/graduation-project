import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Login: (state, action) => {
      state.user = action.payload;
    },
    Logout: (state, action) => {
      state.user = {};
    },
  },
});

export const { Login, Logout } = authSlice.actions;
export default authSlice.reducer;  
