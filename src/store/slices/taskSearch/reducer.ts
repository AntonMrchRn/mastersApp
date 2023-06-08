import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '@/types/error';

import { getSearchTasks, getTableNames } from './asyncActions';
import { InitialState } from './types';

const initialState: InitialState = {
  list: [],
  tableNames: [],
  loadingNames: false,
  loadingList: false,
  errorList: {},
  errorNames: {},
};

const taskSearch = createSlice({
  name: 'taskSearch',
  initialState,
  reducers: {
    // login: state => {},
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
        state.loadingList = false;
      }
    );
    builder.addCase(getSearchTasks.rejected, (state, { payload }) => {
      state.errorList = payload as Error;
      state.loadingList = false;
    });

    // get table names
    builder.addCase(getTableNames.pending, state => {
      state.loadingList = true;
    });
    builder.addCase(
      getTableNames.fulfilled,
      (state, { payload }: PayloadAction<InitialState['tableNames']>) => {
        state.tableNames = payload;
        state.loadingNames = false;
      }
    );
    builder.addCase(getTableNames.rejected, (state, { payload }) => {
      state.errorNames = payload as Error;
      state.loadingNames = false;
    });
  },
});

export default taskSearch;
