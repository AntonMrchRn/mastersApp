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
  authErrorCode: null,
  recoveryError: null,
  isRecovery: false,
  isActiveTimer: false,
  isRecoveryEmail: false,
  isActiveTimerEmail: false,
  timeout: null,
  timeOutEmail: null,
  restore: false,
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
      // @ts-expect-error TS(2322): Type 'false' is not assignable to type 'null'.
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
    clearAuthError: (state, action) => {
      state.authError = action.payload;
      state.authErrorCode = action.payload;
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
      // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
      state.loading = true;
    });
    builder.addCase(fetchUserAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.authError = null;
      // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
      state.loading = false;
    });
    builder.addCase(fetchUserAuth.rejected, (state, action) => {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      state.authError = action.payload?.message;
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      state.authErrorCode = action.payload?.code;
      // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
      state.loading = false;
    });

    // recovery
    builder.addCase(recoveryPassword.pending, state => {
      // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
      state.loading = true;
    });
    builder.addCase(recoveryPassword.fulfilled, (state, action) => {
      // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
      state.loading = false;
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      action.payload.isPhoneAuth
        ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          ((state.timeout = action.payload.data), (state.isRecovery = true))
        : // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          ((state.timeOutEmail = action.payload.data),
          (state.isRecoveryEmail = true));
    });
    builder.addCase(recoveryPassword.rejected, (state, action) => {
      // @ts-expect-error TS(2322): Type 'unknown' is not assignable to type 'null'.
      state.recoveryError = action.payload;
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      state.authError = action.payload?.message;
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      state.authErrorCode = action.payload?.code;
      // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
      state.loading = false;
    });

    //restore
    builder.addCase(restorePassword.pending, state => {
      // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
      state.loading = true;
    });
    builder.addCase(restorePassword.fulfilled, (state, action) => {
      state.restore = true;
      // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
      state.loading = false;
    });
    builder.addCase(restorePassword.rejected, (state, action) => {
      // @ts-expect-error TS(2322): Type 'unknown' is not assignable to type 'null'.
      state.recoveryError = action.payload;
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      state.authError = action.payload?.message;
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      state.authErrorCode = action.payload?.code;
      // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
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
  clearAuthError,
  timeOutAsync,
  timeOutAsyncEmail,
} = userAuth.actions;

export default userAuth.reducer;
