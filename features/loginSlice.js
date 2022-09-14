import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: true,
  userToken: null
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoading = false;
      state.userToken = 'asds';
    },

    logout: (state, action) => {
        state.isLoading = null;
        state.userToken = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions

export const selectLogin = state => state.login;

export default loginSlice.reducer