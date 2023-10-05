import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetTaskResponse } from '@/store/api/tasks/types';
import { Error } from '@/types/error';

import { getSearchTasks, refreshTasks } from './asyncActions';
import { InitialState } from './types';

const initialState: InitialState = {
  list: undefined,
  data: [],
  tableNames: [],
  loadingNames: false,
  loadingList: 0,
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
      state.loadingList = state.loadingList + 1;
    });
    builder.addCase(
      getSearchTasks.fulfilled,
      (state, { payload }: PayloadAction<GetTaskResponse>) => {
        state.list = payload;
        state.data = payload.tasks?.length
          ? state.data?.concat(<[]>payload.tasks)
          : state.data;

        state.loadingList = state.loadingList - 1;
      },
    );
    builder.addCase(getSearchTasks.rejected, (state, { payload }) => {
      state.errorList = payload as Error;
      state.loadingList = state.loadingList - 1;
    });

    // refresh tasks
    builder.addCase(refreshTasks.pending, state => {
      state.loadingList = state.loadingList + 1;
    });
    builder.addCase(
      refreshTasks.fulfilled,
      (state, { payload }: PayloadAction<InitialState['list']>) => {
        state.list = payload;
        state.data = payload?.tasks;
        state.loadingList = state.loadingList - 1;
      },
    );
    builder.addCase(refreshTasks.rejected, (state, { payload }) => {
      state.errorList = payload as Error;
      state.loadingList = state.loadingList - 1;
    });
  },
});

export const { clearList } = myTasks.actions;

export default myTasks;
