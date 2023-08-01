import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Error } from '@/types/error';

import {
  getComments,
  getCommentsPreview,
  getMyTasks,
  refreshMyTasks,
  sendMessage,
} from './asyncActions';
import { GetSendResponse, InitialState } from './types';

const initialState: InitialState = {
  list: {},
  data: [],
  tableNames: [],
  comments: {},
  commentsPreview: {},
  loadingSend: false,
  loadingCommentsPreview: false,
  loadingComments: false,
  loadingList: false,
  loadingEndReached: false,
  errorList: null,
  errorNames: null,
  errorComments: null,
  errorCommentsPreview: null,
};

const taskSearch = createSlice({
  name: 'myTasks',
  initialState,
  reducers: {
    clearList: state => {
      state.data = [];
      state.errorList = null;
    },
    clearCommentsPreview: state => {
      state.commentsPreview = {};
    },
    clearComments: state => {
      state.comments = {};
    },
  },
  extraReducers: builder => {
    // получить список задач в поиске
    builder.addCase(getMyTasks.pending, state => {
      state.loadingEndReached = true;
    });
    builder.addCase(
      getMyTasks.fulfilled,
      (state, { payload }: PayloadAction<InitialState['list']>) => {
        state.list = payload;
        state.data = payload.tasks?.length
          ? state.data?.concat(<[]>payload.tasks)
          : state.data;

        state.loadingEndReached = false;
      }
    );
    builder.addCase(getMyTasks.rejected, (state, { payload }) => {
      state.errorList = payload as Error;
      state.loadingEndReached = false;
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
      state.comments.taskComment = [];
      state.errorComments = payload as Error;
      state.loadingComments = false;
    });
    // получить превью комментарии
    builder.addCase(getCommentsPreview.pending, state => {
      state.loadingCommentsPreview = true;
    });
    builder.addCase(
      getCommentsPreview.fulfilled,
      (state, { payload }: PayloadAction<InitialState['comments']>) => {
        state.commentsPreview.taskComment = payload.taskComment?.reverse();
        state.loadingCommentsPreview = false;
      }
    );
    builder.addCase(getCommentsPreview.rejected, (state, { payload }) => {
      state.errorCommentsPreview = payload as Error;
      state.loadingCommentsPreview = false;
    });
    // отправка сообщения
    builder.addCase(sendMessage.pending, state => {
      state.loadingSend = true;
    });
    builder.addCase(
      sendMessage.fulfilled,
      (state, { payload }: PayloadAction<GetSendResponse>) => {
        state.comments.taskComment &&
          state.comments.taskComment.unshift(payload);
        state.loadingSend = false;
      }
    );
    builder.addCase(sendMessage.rejected, (state, { payload }) => {
      state.errorComments = payload as Error;
      state.loadingSend = false;
    });
  },
});

export const { clearList, clearCommentsPreview, clearComments } =
  taskSearch.actions;

export default taskSearch;
