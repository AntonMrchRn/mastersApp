import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axiosInstance } from '@/services/axios/axiosInstance';

type RequestArgs = {
  idList: number;
  numberOfPosts?: number;
  fromTask?: number;
  regionID?: number[];
};

const getSearchTasks = createAsyncThunk(
  '/getSearchTasks',
  async (
    { idList, numberOfPosts = 30, fromTask = 0, regionID }: RequestArgs,
    thunkApi,
  ) => {
    try {
      const { data } = await axiosInstance.get(
        `tasks/web?query=?(object==regionID^^${regionID?.join(
          ',',
        )}*setID==${idList}*statusID!=1)?ID,desc,${numberOfPosts},${fromTask}`,
      );

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

const refreshTasks = createAsyncThunk(
  '/refreshTasks',
  async (
    { idList, numberOfPosts = 30, fromTask = 0, regionID }: RequestArgs,
    thunkApi,
  ) => {
    try {
      const { data } = await axiosInstance.get(
        `tasks/web?query=?(object==regionID^^${regionID?.join(
          ',',
        )}*setID==${idList}*statusID!=1)?ID,desc,${numberOfPosts},${fromTask}`,
      );

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export { getSearchTasks, refreshTasks };
