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
  isRecoveryEmail: false,
  isActiveTimerEmail: false,
  timeout: null,
  timeOutEmail: null,
  restore: false,
  visible: false,
  visibleEmail: false,
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
    clearIsRecoveryEmail: state => {
      state.isRecoveryEmail = false;
    },
    timerOnEmail: state => {
      state.isActiveTimerEmail = true;
    },
    timerOffEmail: state => {
      state.isActiveTimerEmail = false;
    },
    modalVisible: (state, action) => {
      state.visible = action.payload;
    },
    modalVisibleEmail: (state, action) => {
      state.visibleEmail = action.payload;
    },
    clearAuthError: (state, action) => {
      state.authError = action.payload;
    },
    timeOutAsync: (state, action) => {
      state.timeout = action.payload;
    },
    timeOutAsyncEmail: (state, action) => {
      state.timeOutEmail = action.payload;
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
      state.loading = false;
      action.payload.isPhoneAuth
        ? ((state.timeout = action.payload.data), (state.isRecovery = true))
        : ((state.timeOutEmail = action.payload.data),
          (state.isRecoveryEmail = true));
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
  clearIsRecoveryEmail,
  timerOnEmail,
  timerOffEmail,
  clearRecoveryError,
  modalVisible,
  modalVisibleEmail,
  clearAuthError,
  timeOutAsync,
  timeOutAsyncEmail,
} = userAuth.actions;

export default userAuth.reducer;
