import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserAuth,
  recoveryPassword,
  restorePassword,
} from './asyncActions';

const initialState = {
  user: null,
  isAuth: false,
  authError: null,
  recoveryError: null,
  isRecovery: false,
  isActiveTimer: false,
  timeout: null,
  restore: false,
  visible: false,
};

export const userAuth = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    login: state => {
      state.isAuth = true;
    },
    logOut: state => {
      state.isAuth = false;
    },
    clearIsRecovery: state => {
      state.isRecovery = false;
    },
    clearRecoveryError: state => {
      state.recoveryError = false;
    },
    timerOn: state => {
      state.isActiveTimer = true;
    },
    timerOff: state => {
      state.isActiveTimer = false;
    },
    modalVisible: (state, action) => {
      state.visible = action.payload;
    },
  },
  extraReducers: builder => {
    // auth
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

    // recovery
    builder.addCase(recoveryPassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(recoveryPassword.fulfilled, (state, action) => {
      state.isRecovery = true;
      state.loading = false;
      state.timeout = action.payload;
    });
    builder.addCase(recoveryPassword.rejected, (state, action) => {
      state.recoveryError = action.payload;
      state.loading = false;
    });

    //restore
    builder.addCase(restorePassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(restorePassword.fulfilled, (state, action) => {
      state.restore = true;
      state.loading = false;
    });
    builder.addCase(restorePassword.rejected, (state, action) => {
      state.recoveryError = action.payload;
      state.loading = false;
    });
  },
});

export const {
  login,
  logOut,
  clearIsRecovery,
  timerOn,
  timerOff,
  clearRecoveryError,
  modalVisible,
} = userAuth.actions;

export default userAuth.reducer;
