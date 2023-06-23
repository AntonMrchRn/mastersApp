import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axiosInstance } from '@/services/axios/axiosInstance';

type RequestArgs = {
  idList: number;
  numberOfPosts?: number;
  fromTask?: number;
};

const getSearchTasks = createAsyncThunk(
  '/searchTask',
  async (
    { idList, numberOfPosts = 30, fromTask = 0 }: RequestArgs,
    thunkApi
  ) => {
    try {
      // TODO изменить квери параметры для оптимизации
      const { data } = await axiosInstance.get(
        `tasks/web?query=?setID==${idList}?ID,desc,${numberOfPosts},${fromTask}`
      );

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

const refreshTasks = createAsyncThunk(
  '/refreshTasks',
  async (
    { idList, numberOfPosts = 30, fromTask = 0 }: RequestArgs,
    thunkApi
  ) => {
    try {
      const { data } = await axiosInstance.get(
        `tasks/web?query=?setID==${idList}?ID,desc,${numberOfPosts},${fromTask}`
      );

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export { getSearchTasks, refreshTasks };
