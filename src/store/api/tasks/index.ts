import { store } from '@/store';
import { api } from '@/store/api';
import { setProgresses } from '@/store/slices/tasks/actions';
import { Progress } from '@/store/slices/tasks/types';

import {
  GetTaskResponce,
  GetTaskStatusesResponce,
  PostTasksFilesRequest,
  Task,
} from './types';

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
      patchTask: builder.mutation<GetTaskResponce, Task>({
        query: data => ({
          url: `tasks/web`,
          method: 'PATCH',
          data,
        }),
      }),
      postTasksFiles: builder.mutation<object, PostTasksFilesRequest>({
        query: ({ formData, files, date }) => {
          return {
            url: `tasks/files/multiple`,
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progressEvent => {
              const progress: Progress = {
                loaded: progressEvent.loaded,
                total: progressEvent.total,
                progress: progressEvent.progress,
                bytes: progressEvent.bytes,
                rate: progressEvent.rate,
                estimated: progressEvent.estimated,
                upload: progressEvent.upload,
                download: progressEvent.download,
                files,
              };
              const payload = { [date]: progress };
              store.dispatch(setProgresses(payload));
            },
          };
        },
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
