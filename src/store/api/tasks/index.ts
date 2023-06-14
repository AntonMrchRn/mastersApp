import { api } from '@/store/api';

import { GetTaskResponce, GetTaskStatusesResponce, Task } from './types';

export const tasksAPI = api
  .enhanceEndpoints({
    addTagTypes: ['user'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getTask: builder.query<GetTaskResponce, string>({
        query: id => ({
          url: `tasks/web?query=?ID==${id}?`,
          method: 'GET',
        }),
      }),
      getTaskStatuses: builder.query<GetTaskStatusesResponce, void>({
        query: () => ({
          url: `/aux?query=?tableName==task_status?`,
          method: 'GET',
        }),
      }),
      getTableNames: builder.query<GetTaskStatusesResponce, void>({
        query: () => ({
          url: `aux?query=?tableName==set?`,
          method: 'GET',
        }),
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetTaskQuery,
  useGetTaskStatusesQuery,
  useGetTableNamesQuery,
} = tasksAPI;
