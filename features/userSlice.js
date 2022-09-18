import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userToken: null,
  data: {}
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
    setData: (state, action) => {
      state.data = action.payload.data
    }
  },
});

export const { login, logout, setData } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;