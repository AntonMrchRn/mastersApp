import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '@/types/error';

import { getComments, getMyTasks, refreshMyTasks } from './asyncActions';
import { InitialState } from './types';

const initialState: InitialState = {
  list: {},
  data: [],
  tableNames: [],
  comments: {},
  loadingComments: false,
  loadingList: false,
  loadingEndReched: false,
  errorList: null,
  errorNames: null,
  errorComments: null,
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
    // получить список задач в поиске
    builder.addCase(getMyTasks.pending, state => {
      state.loadingEndReched = true;
    });
    builder.addCase(
      getMyTasks.fulfilled,
      (state, { payload }: PayloadAction<InitialState['list']>) => {
        state.list = payload;
        state.data = payload.tasks?.length
          ? state.data?.concat(<[]>payload.tasks)
          : state.data;

        state.loadingEndReched = false;
      }
    );
    builder.addCase(getMyTasks.rejected, (state, { payload }) => {
      state.errorList = payload as Error;
      state.loadingEndReched = false;
    });

    // обновить задачи
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

    // получить комментарии
    builder.addCase(getComments.pending, state => {
      state.loadingComments = true;
    });
    builder.addCase(
      getComments.fulfilled,
      (state, { payload }: PayloadAction<InitialState['comments']>) => {
        state.comments = payload;
        state.loadingComments = false;
      }
    );
    builder.addCase(getComments.rejected, (state, { payload }) => {
      state.errorComments = payload as Error;
      state.loadingComments = false;
    });
  },
});

export const { clearList } = taskSearch.actions;

export default taskSearch;
