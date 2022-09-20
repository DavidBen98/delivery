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
    },
    setUbication: (state, action) => {
      state.data.ubication = action.payload
    }
  },
});

export const { login, logout, setData, setUbication } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;