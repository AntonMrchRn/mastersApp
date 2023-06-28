import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axiosInstance } from '@/services/axios/axiosInstance';

type RequestArgs = {
  idList?: number;
  numberOfPosts?: number;
  fromTask?: number;
};

const getMyTasks = createAsyncThunk(
  '/getMyTasks',
  async (
    { idList, numberOfPosts = 30, fromTask = 0 }: RequestArgs,
    thunkApi
  ) => {
    try {
      const { data } = await axiosInstance.get(
        `tasks/web?query=?(creatorID==8*coordinator==ID^^8)*setID==1,2?ID,desc,30,0&isMine=true`
      );
      // const { data } = await axiosInstance.get(
      //   `tasks/web?query=?setID==${idList}?ID,desc,${numberOfPosts},${fromTask}`
      // );

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

const refreshMyTasks = createAsyncThunk(
  '/refreshMyTasks',
  async (
    { idList, numberOfPosts = 30, fromTask = 0 }: RequestArgs,
    thunkApi
  ) => {
    const { userID } = thunkApi.getState().auth.user;

    try {
      const { data } = await axiosInstance.get(
        `tasks/web?query=?(creatorID==${userID}||coordinator==ID^^${userID})*setID==${idList}?ID,desc,${numberOfPosts},${fromTask}`
      );

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export { getMyTasks, refreshMyTasks };
