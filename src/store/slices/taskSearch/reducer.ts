import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '@/types/error';

import { getSearchTasks, refreshTasks } from './asyncActions';
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

const myTasks = createSlice({
  name: 'taskSearch',
  initialState,
  reducers: {
    clearList: state => {
      state.data = [];
      state.errorList = null;
    },
  },
  extraReducers: builder => {
    // get search tasks
    builder.addCase(getSearchTasks.pending, state => {
      state.loadingList = true;
    });
    builder.addCase(
      getSearchTasks.fulfilled,
      (state, { payload }: PayloadAction<InitialState['list']>) => {
        state.list = payload;
        state.data = payload.tasks?.length
          ? state.data?.concat(<[]>payload.tasks)
          : state.data;

        state.loadingList = false;
      }
    );
    builder.addCase(getSearchTasks.rejected, (state, { payload }) => {
      state.errorList = payload as Error;
      state.loadingList = false;
    });

    // refresh tasks
    builder.addCase(refreshTasks.pending, state => {
      state.loadingList = true;
    });
    builder.addCase(
      refreshTasks.fulfilled,
      (state, { payload }: PayloadAction<InitialState['list']>) => {
        state.list = payload;
        state.data = payload.tasks;
        state.loadingList = false;
      }
    );
    builder.addCase(refreshTasks.rejected, (state, { payload }) => {
      state.errorList = payload as Error;
      state.loadingList = false;
    });
  },
});

export const { clearList } = myTasks.actions;

export default myTasks;
