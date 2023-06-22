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
        transformResponse: (res: GetTaskStatusesResponce) => {
          return res;
        },
      }),
      patchTask: builder.mutation<GetTaskResponce, Task>({
        query: data => ({
          url: `tasks/web`,
          method: 'PATCH',
          data,
        }),
      }),
      postTasksFiles: builder.mutation<object, FormData>({
        query: data => ({
          url: `tasks/files/multiple`,
          method: 'POST',
          data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      }),
      deleteTasksFiles: builder.mutation<object, string>({
        query: id => ({
          url: `tasks/files/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetTaskQuery,
  useGetTaskStatusesQuery,
  useGetTableNamesQuery,
  usePatchTaskMutation,
  usePostTasksFilesMutation,
  useDeleteTasksFilesMutation,
} = tasksAPI;
