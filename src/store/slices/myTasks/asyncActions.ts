import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { taskCardsQueryKeys } from '@/constants/task';
import { axiosInstance } from '@/services/axios/axiosInstance';
import { RootState } from '@/store';
import { GetTaskResponse } from '@/store/api/tasks/types';

import { GetCommentsResponse, GetSendResponse } from './types';

type RequestArgs = {
  idList?: number;
  numberOfPosts?: number;
  fromTask?: number;
  idCard?: string | number;
  sort?: 'asc' | 'desc';
  regionID?: number[];
};

type RequestSendArgs = {
  taskId: number | string;
  comment: string;
  recipientIDs: number[];
};

const getEndpoint = ({
  idList,
  numberOfPosts,
  fromTask,
  regionID,
}: {
  idList: number;
  userID: number;
  numberOfPosts: number;
  fromTask: number;
  regionID: number[];
}) => {
  switch (idList) {
    //Все ( Мои )
    case 1:
      return `(object==regionID^^${regionID?.join(
        ',',
      )}*setID==1,2)?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //Новые
    case 2:
      return `(object==regionID^^${regionID?.join(
        ',',
      )}*statusID==1,2*setID==1,2)?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //В работе
    case 3:
      return `(object==regionID^^${regionID?.join(
        ',',
      )}*statusID==11*outlayStatusID==1,3,5*setID==1,2)?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //Согласованные сметы
    case 4:
      return `(object==regionID^^${regionID?.join(
        ',',
      )}*statusID==11*outlayStatusID==2*setID==1,2)?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //Сдача работ
    case 5:
      return `(object==regionID^^${regionID?.join(
        ',',
      )}*statusID==5*setID==1,2)?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //Выполненные
    case 6:
      return `(statusID==6,12||statusID==9*toClose==false)*(object==regionID^^${regionID?.join(
        ',',
      )}*setID==1,2)?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //Отмененные
    case 7:
      return `(object==regionID^^${regionID?.join(
        ',',
      )}*statusID==7,8*setID==1,2)?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //К закрытию
    case 8:
      return `(object==regionID^^${regionID?.join(
        ',',
      )}*toClose==true*setID==1,2)?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    default:
      return `(object==regionID^^${regionID?.join(
        ',',
      )}*setID==1,2)?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
  }
};

const getMyTasks = createAsyncThunk<
  GetTaskResponse,
  RequestArgs,
  { state: RootState }
>(
  '/getMyTasks',
  async (
    { idList, numberOfPosts = 30, fromTask = 0, regionID }: RequestArgs,
    thunkApi,
  ) => {
    const userID = thunkApi.getState().auth.user?.userID;
    try {
      if (userID && idList && regionID) {
        const { data } = await axiosInstance.get(
          `tasks/web?query=${taskCardsQueryKeys}?${getEndpoint({
            idList,
            userID,
            numberOfPosts,
            fromTask,
            regionID,
          })}`,
        );
        return data;
      }
      return thunkApi.rejectWithValue('Необходимо авторизоваться');
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

const refreshMyTasks = createAsyncThunk<
  GetTaskResponse,
  RequestArgs,
  { state: RootState }
>(
  '/refreshMyTasks',
  async (
    { idList, numberOfPosts = 30, fromTask = 0, regionID }: RequestArgs,
    thunkApi,
  ) => {
    const userID = thunkApi.getState().auth.user?.userID;

    try {
      if (userID && idList && regionID) {
        const { data } = await axiosInstance.get(
          `tasks/web?query=${taskCardsQueryKeys}?${getEndpoint({
            idList,
            userID,
            numberOfPosts,
            fromTask,
            regionID,
          })}`,
        );
        return data;
      }
      return thunkApi.rejectWithValue('Необходимо авторизоваться');
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

const getCommentsPreview = createAsyncThunk<
  GetCommentsResponse,
  RequestArgs,
  { state: RootState }
>(
  '/getCommentsPreview',
  async (
    { idCard, numberOfPosts = 30, fromTask = 0, sort = 'asc' }: RequestArgs,
    thunkApi,
  ) => {
    const userID = thunkApi.getState().auth.user?.userID;

    try {
      if (userID) {
        const { data } = await axiosInstance.get(
          `tasks/comments?query=ID,userID,nominy,authorTypeID,comment,creationTime,fullname?(taskID==${idCard}*authorTypeID!=3)?creationTime,${sort},${numberOfPosts},${fromTask}`,
        );
        return data;
      }
      return thunkApi.rejectWithValue('Необходимо авторизоваться');
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

const getComments = createAsyncThunk<
  GetCommentsResponse,
  RequestArgs,
  { state: RootState }
>(
  '/getComments',
  async (
    { idCard, numberOfPosts = 30, fromTask = 0, sort = 'asc' }: RequestArgs,
    thunkApi,
  ) => {
    const userID = thunkApi.getState().auth.user?.userID;

    try {
      if (userID) {
        const { data } = await axiosInstance.get(
          `tasks/comments?query=ID,userID,nominy,authorTypeID,comment,creationTime,fullname?(taskID==${idCard}*authorTypeID!=3)?creationTime,${sort},${numberOfPosts},${fromTask}`,
        );
        return data;
      }
      return thunkApi.rejectWithValue('Необходимо авторизоваться');
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

const sendMessage = createAsyncThunk<
  GetSendResponse,
  RequestSendArgs,
  { state: RootState }
>(
  '/sendMessage',
  async ({ taskId, comment, recipientIDs }: RequestSendArgs, thunkApi) => {
    try {
      const { data } = await axiosInstance.post('tasks/comments', {
        taskId: taskId,
        comment: comment,
        recipientIDs,
      });

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export {
  getMyTasks,
  refreshMyTasks,
  getComments,
  getCommentsPreview,
  sendMessage,
};
