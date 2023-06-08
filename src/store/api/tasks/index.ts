import { api } from '@/store/api';

import { GetTaskResponce } from './types';

export const tasksAPI = api.injectEndpoints({
  endpoints: builder => ({
    getTask: builder.query<GetTaskResponce, void>({
      query: () => ({
        url: 'tasks/web?query=?ID==944?',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetTaskQuery } = tasksAPI;
