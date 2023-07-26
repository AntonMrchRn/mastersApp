import { store } from '@/store';
import { api } from '@/store/api';
import { setProgresses } from '@/store/slices/tasks/actions';
import { File, FilesParams, Progress } from '@/types/fileManager';

import {
  GetOffersResponse,
  GetServicesCategoriesResponse,
  GetServicesResponse,
  GetTaskHistoryResponse,
  GetTaskResponse,
  GetTaskStatusesResponse,
  PostOffersRequest,
  Service,
  Task,
} from './types';

export const tasksAPI = api
  .enhanceEndpoints({
    addTagTypes: ['task'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getTask: builder.query<GetTaskResponse, string>({
        query: id => ({
          url: `tasks/web?query=?ID==${id}?`,
          method: 'GET',
        }),
        providesTags: ['task'],
      }),
      getTaskHistory: builder.query<GetTaskHistoryResponse, string>({
        query: id => ({
          url: `tasks/comments?query=?ID==${id}*authorTypeID==3?creationTime,asc,,`,
          method: 'GET',
        }),
      }),
      getTaskStatuses: builder.query<GetTaskStatusesResponse, void>({
        query: () => ({
          url: `/aux?query=?tableName==task_status?`,
          method: 'GET',
        }),
      }),
      getServicesCategories: builder.query<GetServicesCategoriesResponse, void>(
        {
          query: () => ({
            url: `services/categories?query=??`,
            method: 'GET',
          }),
        }
      ),
      getServicesByCategories: builder.query<GetServicesResponse, string>({
        query: categoryIds => ({
          url: `services?query=?categoryID==${categoryIds}?`,
          method: 'GET',
        }),
      }),
      getServicesByName: builder.query<GetServicesResponse, string>({
        query: categoryName => ({
          url: `services?query=??&searchQuery=${categoryName}?`,
          method: 'GET',
        }),
      }),
      getOffers: builder.query<GetOffersResponse, string>({
        query: taskID => ({
          url: `offers?query=?taskID==${taskID}?`,
          method: 'GET',
        }),
      }),
      patchTask: builder.mutation<GetTaskResponse, Task>({
        query: data => ({
          url: `tasks/web`,
          method: 'PATCH',
          data,
        }),
      }),
      deleteTaskService: builder.mutation<object, { serviceId: number }>({
        query: ({ serviceId }) => ({
          url: `tasks/services/${serviceId}`,
          method: 'DELETE',
        }),
      }),
      getTaskService: builder.query<
        { count: number; services: Service[] },
        { taskID: number }
      >({
        query: ({ taskID }) => ({
          url: `tasks/services?query=?taskID==${taskID}?`,
          method: 'GET',
        }),
      }),
      patchTaskService: builder.mutation<object, unknown>({
        query: data => ({
          url: 'tasks/services',
          method: 'PATCH',
          data,
        }),
      }),
      postTaskService: builder.mutation<object, unknown>({
        query: data => ({
          url: 'tasks/services',
          method: 'POST',
          data,
        }),
      }),
      patchMaterial: builder.mutation<object, unknown>({
        query: data => ({
          url: 'materials',
          method: 'PATCH',
          data,
        }),
      }),
      postMaterial: builder.mutation<object, unknown>({
        query: data => ({
          url: 'materials',
          method: 'POST',
          data,
        }),
      }),
      deleteMaterial: builder.mutation<object, { ID: string; taskID: string }>({
        query: data => ({
          url: `materials`,
          params: data,
          method: 'DELETE',
          data,
        }),
      }),
      patchTaskLot: builder.mutation<
        object,
        { taskID: number; offerID?: number; sum: number }
      >({
        query: data => ({
          url: `tasks/lot`,
          method: 'PATCH',
          data,
        }),
      }),
      postOffers: builder.mutation<object, PostOffersRequest>({
        query: data => ({
          url: `offers`,
          method: 'POST',
          data,
        }),
      }),
      postTasksFiles: builder.mutation<File[], FilesParams>({
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
        invalidatesTags: ['task'],
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
  usePatchTaskMutation,
  usePostTasksFilesMutation,
  useDeleteTasksFilesMutation,
  useGetServicesCategoriesQuery,
  useGetServicesByCategoriesQuery,
  useLazyGetServicesByNameQuery,
  useGetOffersQuery,
  useDeleteTaskServiceMutation,
  usePatchTaskServiceMutation,
  usePatchMaterialMutation,
  useDeleteMaterialMutation,
  usePostMaterialMutation,
  usePostTaskServiceMutation,
  useGetTaskServiceQuery,
  usePatchTaskLotMutation,
} = tasksAPI;
