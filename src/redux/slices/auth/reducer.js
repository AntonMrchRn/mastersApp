import { createSlice } from '@reduxjs/toolkit';
import { fetchUserAuth } from './asyncActions';

const initialState = {
  user: null,
  isAuth: false,
  authError: null,
  error: null,
};

export const userAuth = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    Login: state => {
      state.isAuth = true;
    },
    notLogin: state => {
      state.isAuth = false;
    },
  },
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

export const { Login, notLogin } = userAuth.actions;

export default userAuth.reducer;
