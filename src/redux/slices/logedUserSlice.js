import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  logedIn: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Login: (state, action) => {
      state.user = action.payload;
      state.logedIn = true;
      state.isAdmin = action?.payload?.isAdmin ||  action?.payload?.role ===1;
    },
    Logout: (state, action) => {
      state.user = {};
      state.logedIn = false;
      state.isAdmin = false;
    },
  },
});

export const { Login, Logout } = authSlice.actions;
export default authSlice.reducer;  
