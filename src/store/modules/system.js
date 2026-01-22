import { createSlice } from '@reduxjs/toolkit';
import store from 'store';

const initState = {
  siderCollapsed: store.get('siderCollapsed') || false,
};

const systemSlice = createSlice({
  name: 'system',
  initialState: initState,
  reducers: {
    setSiderCollapsed(state, action) {
      store.set('siderCollapsed', action.payload);
      state.siderCollapsed = action.payload;
    },
  },
});

export default systemSlice.reducer;
