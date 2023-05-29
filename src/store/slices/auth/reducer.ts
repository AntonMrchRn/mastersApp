import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '@/types/error';

import {
  fetchUserAuth,
  recoveryPassword,
  restorePassword,
} from './asyncActions';
import { InitialState, RecoveryPasswordPayload } from './types';

const initialState: InitialState = {
  user: null,
  isAuth: false,
  authError: null,
  authErrorCode: null,
  recoveryError: null,
  isRecovery: false,
  isActiveTimer: false,
  isRecoveryEmail: false,
  isActiveTimerEmail: false,
  timeout: null,
  timeOutEmail: null,
  restore: false,
  loading: false,
};

const userAuth = createSlice({
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
    clearAuthError: (state, { payload }) => {
      state.authError = payload;
      state.authErrorCode = payload;
    },
    timeOutAsync: (state, { payload }) => {
      state.timeout = payload;
    },
    timeOutAsyncEmail: (state, { payload }) => {
      state.timeOutEmail = payload;
    },
  },
  extraReducers: builder => {
    // auth
    builder.addCase(fetchUserAuth.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchUserAuth.fulfilled,
      (state, { payload }: PayloadAction<InitialState['user']>) => {
        state.user = payload;
        state.isAuth = true;
        state.authError = null;
        state.authErrorCode = null;
        state.loading = false;
      }
    );
    builder.addCase(fetchUserAuth.rejected, (state, { payload }) => {
      state.authError = (payload as Error)?.message;
      state.authErrorCode = (payload as Error)?.code;
      state.loading = false;
    });

    // recovery
    builder.addCase(recoveryPassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      recoveryPassword.fulfilled,
      (state, { payload }: PayloadAction<RecoveryPasswordPayload>) => {
        state.loading = false;
        payload.isPhoneAuth
          ? ((state.timeout = payload.data), (state.isRecovery = true))
          : ((state.timeOutEmail = payload.data),
            (state.isRecoveryEmail = true));
      }
    );
    builder.addCase(recoveryPassword.rejected, (state, { payload }) => {
      state.recoveryError = payload as Error;
      state.authError = (payload as Error)?.message;
      state.authErrorCode = (payload as Error)?.code;
      state.loading = false;
    });

    //restore
    builder.addCase(restorePassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(restorePassword.fulfilled, state => {
      state.restore = true;
      state.loading = false;
    });
    builder.addCase(restorePassword.rejected, (state, { payload }) => {
      state.recoveryError = payload as Error;
      state.authError = (payload as Error)?.message;
      state.authErrorCode = (payload as Error)?.code;
      state.loading = false;
    });
  },
});

export default userAuth;
