import { createSlice } from '@reduxjs/toolkit';
import { fetchUserAuth } from './asyncActions';

const initialState = {
  user: null,
  isAuth: false,
  authError: null,
  error: null,
};

export const getData = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserAuth.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUserAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.authError = null;
      state.loading = false;
    });
    builder.addCase(fetchUserAuth.rejected, (state, action) => {
      state.authError = action.payload?.message;
      state.loading = false;
    });
  },
});

export default getData.reducer;
