import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import store from 'store';

const initState = {
  token: Cookies.get('token') || '',
  userInfo: store.get('userInfo') || {},
  menu: store.get('menu') || [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setToken(state, action) {
      Cookies.set('token', action.payload);
      state.token = action.payload;
    },
    setUserInfo(state, action) {
      store.set('userInfo', action.payload);
      state.userInfo = action.payload;
    },
    setMenu(state, action) {
      store.set('menu', action.payload);
      state.menu = action.payload;
    },
    setClear() {
      Cookies.remove('token');
      store.remove('userInfo');
      store.remove('menu');
      return initState;
    },
  },
});

export default userSlice.reducer;
