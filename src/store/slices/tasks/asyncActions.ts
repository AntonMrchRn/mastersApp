import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axiosInstance } from '@/services/axios/axiosInstance';
import { RootState } from '@/store';
import { Service } from '@/store/api/tasks/types';

export const getTaskServices = createAsyncThunk<
  { count: number; serices: Service[]; taskId: number },
  { taskId: number },
  { state: RootState }
>('/getSearchTasks', async ({ taskId }: { taskId: number }, thunkApi) => {
  const { currentTaskID } = thunkApi.getState().tasks;
  if (!taskId || currentTaskID !== taskId) {
    try {
      const { data } = await axiosInstance.get(
        `tasks/services?query=?taskID==${taskId}?`
      );
      return { taskId, ...data };
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  }
});
