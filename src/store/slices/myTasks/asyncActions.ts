import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axiosInstance } from '@/services/axios/axiosInstance';
import { RootState } from '@/store';
import { GetTaskResponse } from '@/store/api/tasks/types';

type RequestArgs = {
  idList: number;
  numberOfPosts?: number;
  fromTask?: number;
};

const getEndpont = ({
  idList,
  userID,
  numberOfPosts,
  fromTask,
}: {
  idList: number;
  userID: number;
  numberOfPosts: number;
  fromTask: number;
}) => {
  switch (idList) {
    //Все ( Мои )
    case 1:
      return `(creatorID==${userID}||coordinator==ID^^${userID})*setID==1,2?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //Новые
    case 2:
      return `(creatorID==${userID}||coordinator==ID^^${userID})*setID==1,2*statusID==1,2?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //В работе
    case 3:
      return `(creatorID==${userID}||coordinator==ID^^${userID})*statusID==11*outlayStatusID==1,3,5*setID==1,2?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //Согласованные сметы
    case 4:
      return `(creatorID==${userID}||coordinator==ID^^${userID})*statusID==11*outlayStatusID==2*setID==1,2?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //Сдача работ
    case 5:
      return `(creatorID==${userID}||coordinator==ID^^${userID})*setID==1,2*statusID==5?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //Выполненные
    case 6:
      return `(creatorID==${userID}||coordinator==ID^^${userID})*(statusID==6,12||statusID==9*toClose==false)*setID==1,2?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //Отмененные
    case 7:
      return `(creatorID==${userID}||coordinator==ID^^${userID})*setID==1,2*statusID==7,8?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    //К закрытию
    case 8:
      return `(creatorID==${userID}||coordinator==ID^^${userID})*setID==1,2*toClose==true?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
    default:
      return `(creatorID==${userID}||coordinator==ID^^${userID})*setID==1,2?ID,desc,${numberOfPosts},${fromTask}&isMine=true`;
  }
};

const getMyTasks = createAsyncThunk<
  GetTaskResponse,
  RequestArgs,
  { state: RootState }
>(
  '/getMyTasks',
  async (
    { idList, numberOfPosts = 30, fromTask = 0 }: RequestArgs,
    thunkApi
  ) => {
    const userID = thunkApi.getState().auth.user?.userID;
    try {
      if (userID) {
        const { data } = await axiosInstance.get(
          `tasks/web?query=?${getEndpont({
            idList,
            userID,
            numberOfPosts,
            fromTask,
          })}`
        );
        return data;
      }
      return thunkApi.rejectWithValue('Необходимо авторизоваться');
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

const refreshMyTasks = createAsyncThunk<
  GetTaskResponse,
  RequestArgs,
  { state: RootState }
>(
  '/refreshMyTasks',
  async (
    { idList, numberOfPosts = 30, fromTask = 0 }: RequestArgs,
    thunkApi
  ) => {
    const userID = thunkApi.getState().auth.user?.userID;

    try {
      if (userID) {
        const { data } = await axiosInstance.get(
          `tasks/web?query=?${getEndpont({
            idList,
            userID,
            numberOfPosts,
            fromTask,
          })}`
        );
        return data;
      }
      return thunkApi.rejectWithValue('Необходимо авторизоваться');
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export { getMyTasks, refreshMyTasks };
