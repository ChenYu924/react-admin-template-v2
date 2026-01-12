import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    userInfo: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clear(state) {
      state.token = '';
      state.userInfo = null;
    },
  },
});

export default userSlice.reducer;
