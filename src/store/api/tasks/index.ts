import { api } from '@/store/api';

import { GetTaskResponce, GetTaskStatusesResponce, Task } from './types';

export const tasksAPI = api.injectEndpoints({
  endpoints: builder => ({
    getTask: builder.query<GetTaskResponce, string>({
      query: id => ({
        url: `tasks/web?query=?ID==${id}?`,
        method: 'GET',
      }),
    }),
    patchTask: builder.mutation<GetTaskResponce, Task>({
      query: body => ({
        url: `tasks/web`,
        method: 'PATCH',
        body,
      }),
    }),
    getTaskStatuses: builder.query<GetTaskStatusesResponce, void>({
      query: () => ({
        url: `/aux?query=?tableName==task_status?`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTaskQuery,
  useGetTaskStatusesQuery,
  usePatchTaskMutation,
} = tasksAPI;
