import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '@/types/error';

import { getMyTasks, refreshMyTasks } from './asyncActions';
import { InitialState } from './types';

const initialState: InitialState = {
  list: {},
  data: [],
  tableNames: [],
  loadingNames: false,
  loadingList: false,
  errorList: null,
  errorNames: null,
};

const taskSearch = createSlice({
  name: 'myTasks',
  initialState,
  reducers: {
    clearList: state => {
      state.data = [];
      state.errorList = null;
    },
  },
  extraReducers: builder => {
    // get search tasks
    builder.addCase(getMyTasks.pending, state => {
      state.loadingList = true;
    });
    builder.addCase(
      getMyTasks.fulfilled,
      (state, { payload }: PayloadAction<InitialState['list']>) => {
        state.list = payload;
        state.data = state.data?.concat(<[]>payload.tasks);
        state.loadingList = false;
      }
    );
    builder.addCase(getMyTasks.rejected, (state, { payload }) => {
      state.errorList = payload as Error;
      state.loadingList = false;
    });

    // refresh my tasks
    builder.addCase(refreshMyTasks.pending, state => {
      state.loadingList = true;
    });
    builder.addCase(
      refreshMyTasks.fulfilled,
      (state, { payload }: PayloadAction<InitialState['list']>) => {
        state.list = payload;
        state.data = payload.tasks;
        state.loadingList = false;
      }
    );
    builder.addCase(refreshMyTasks.rejected, (state, { payload }) => {
      state.errorList = payload as Error;
      state.loadingList = false;
    });
  },
});

export const { clearList } = taskSearch.actions;

export default taskSearch;
