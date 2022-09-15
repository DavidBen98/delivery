import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userToken: null
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.userToken = action.payload.userToken;
    },
    logout: (state) => {
      state.userToken = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;