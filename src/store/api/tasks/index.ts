import { store } from '@/store';
import { api } from '@/store/api';
import { setProgresses } from '@/store/slices/tasks/actions';
import { Progress } from '@/store/slices/tasks/types';

import {
  GetServicesCategoriesResponce,
  GetServicesResponce,
  GetTaskHistoryResponce,
  GetTaskResponce,
  GetTaskStatusesResponce,
  PostTasksFilesRequest,
  Task,
} from './types';

export const tasksAPI = api.injectEndpoints({
  endpoints: builder => ({
    getTask: builder.query<GetTaskResponce, string>({
      query: id => ({
        url: `tasks/web?query=?ID==${id}?`,
        method: 'GET',
      }),
    }),
    getTaskHistory: builder.query<GetTaskHistoryResponce, string>({
      query: id => ({
        url: `tasks/comments?query=?ID==${id}*authorTypeID==3?creationTime,asc,,`,
        method: 'GET',
      }),
    }),
    getTaskStatuses: builder.query<GetTaskStatusesResponce, void>({
      query: () => ({
        url: `/aux?query=?tableName==task_status?`,
        method: 'GET',
      }),
    }),
    getServicesCategories: builder.query<GetServicesCategoriesResponce, void>({
      query: () => ({
        url: `services/categories?query=??`,
        method: 'GET',
      }),
    }),
    getServicesByCategories: builder.query<GetServicesResponce, string>({
      query: categoryIds => ({
        url: `services?query=?categoryID==${categoryIds}?`,
        method: 'GET',
      }),
    }),
    getServicesByName: builder.query<GetServicesResponce, string>({
      query: categoryName => ({
        url: `services?query=??&searchQuery=${categoryName}?`,
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
    postTasksFiles: builder.mutation<object, PostTasksFilesRequest>({
      query: ({ formData, files, date, signal }) => {
        return {
          url: `tasks/files/multiple`,
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          signal,
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
  useGetTaskHistoryQuery,
  useGetTaskStatusesQuery,
  useGetTableNamesQuery,
  usePatchTaskMutation,
  usePostTasksFilesMutation,
  useDeleteTasksFilesMutation,
  useGetServicesCategoriesQuery,
  useGetServicesByCategoriesQuery,
  useLazyGetServicesByNameQuery,
} = tasksAPI;
