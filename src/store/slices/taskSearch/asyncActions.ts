import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axiosInstance } from '@/services/axios/axiosInstance';

const getSearchTasks = createAsyncThunk(
  '/searchTask',
  async (
    { idList, numberOfPosts = 30 }: { idList: number; numberOfPosts?: number },
    thunkApi
  ) => {
    try {
      const { data } = await axiosInstance.get(
        `tasks/web?query=?setID==${idList}?ID,desc,${numberOfPosts},0`
      );

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

const getTableNames = createAsyncThunk('/tableNames', async (_, thunkApi) => {
  try {
    const { data } = await axiosInstance.get('aux?query=?tableName==set?');

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue((error as AxiosError).response?.data);
  }
});

export { getSearchTasks, getTableNames };
