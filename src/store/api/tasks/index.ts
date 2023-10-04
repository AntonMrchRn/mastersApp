import { store } from '@/store';
import { api } from '@/store/api';
import { User, UserResponse } from '@/store/api/user/types';
import { setProgresses } from '@/store/slices/tasks/actions';
import { File, FilesParams, Progress } from '@/types/fileManager';

import {
  GetAvailableContractorsParams,
  GetMeasuresResponse,
  GetOffersResponse,
  GetServicesCategoriesResponse,
  GetServicesResponse,
  GetTaskHistoryResponse,
  GetTaskResponse,
  GetTaskStatusesResponse,
  PatchITTaskMemberParams,
  PatchOffersRequest,
  PostITTaskMemberParams,
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
      getTask: builder.query<GetTaskResponse, number>({
        query: id => ({
          url: `tasks/web?query=?ID==${id}?`,
          method: 'GET',
        }),
        providesTags: ['task'],
      }),
      getTaskHistory: builder.query<GetTaskHistoryResponse, number>({
        query: id => ({
          url: `tasks/comments?query=?taskID==${id}*authorTypeID==3?creationTime,asc,,`,
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
          url: `services/search?query=??&searchQuery=name~~${categoryName}`,
          method: 'GET',
        }),
      }),
      getOffers: builder.query<GetOffersResponse, number>({
        query: taskID => ({
          url: `offers?query=?taskID==${taskID}?`,
          method: 'GET',
        }),
      }),
      getMeasures: builder.query<GetMeasuresResponse, 'service' | 'material'>({
        query: type => ({
          url: `measures?query=?type==${type}?`,
          method: 'GET',
        }),
      }),
      getAvailableContractors: builder.query<
        User[],
        GetAvailableContractorsParams
      >({
        query: ({ taskId, curatorId }) => ({
          url: `users?query=?*curatorID==${curatorId}*taskID==${taskId}?`,
          method: 'GET',
        }),
        transformResponse: (response: UserResponse) => response.users,
      }),
      postITTaskMember: builder.mutation<object, PostITTaskMemberParams>({
        query: data => ({
          url: 'tasks/members/it',
          method: 'POST',
          data,
        }),
        invalidatesTags: ['task'],
      }),
      patchTask: builder.mutation<GetTaskResponse, Task>({
        query: data => ({
          url: `tasks/web`,
          method: 'PATCH',
          data,
        }),
        invalidatesTags: ['task'],
      }),
      deleteTaskService: builder.mutation<object, { serviceId: number }>({
        query: ({ serviceId }) => ({
          url: `tasks/services/${serviceId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['task'],
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
        invalidatesTags: ['task'],
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
      patchITTaskMember: builder.mutation<object, PatchITTaskMemberParams>({
        query: data => ({
          url: 'tasks/members/it',
          method: 'PATCH',
          data,
        }),
        invalidatesTags: ['task'],
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
        invalidatesTags: ['task'],
      }),
      deleteInvitation: builder.mutation<object, number>({
        query: memberID => ({
          url: `/tasks/members/it/${memberID}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['task'],
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
      deleteOffers: builder.mutation<object, string>({
        query: id => ({
          url: `offers/${id}`,
          method: 'DELETE',
        }),
      }),
      patchOffers: builder.mutation<object, PatchOffersRequest>({
        query: data => ({
          url: `offers`,
          method: 'PATCH',
          data,
        }),
        invalidatesTags: ['task'],
      }),
      getUserOffers: builder.query<
        GetOffersResponse,
        { taskID: number; userID: number }
      >({
        query: data => ({
          url: `offers?query=?taskID==${data.taskID}*userID==${data.userID}?`,
          method: 'GET',
        }),
      }),
      getAnotherOffers: builder.query<
        GetOffersResponse,
        { taskID: number; userID: number }
      >({
        query: data => ({
          url: `offers?query=?taskID==${data.taskID}*userID!=${data.userID}?`,
          method: 'GET',
        }),
      }),
      getCompressRate: builder.query<number, void>({
        query: () => ({
          url: 'params?name=compressRate',
          method: 'GET',
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
      deleteTaskFile: builder.mutation<object, number>({
        query: id => ({
          url: `tasks/files/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['task'],
      }),
      deleteITTaskMember: builder.mutation<object, number>({
        query: id => ({
          url: `tasks/members/it/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetTaskQuery,
  useGetAvailableContractorsQuery,
  useGetTaskHistoryQuery,
  useGetTaskStatusesQuery,
  usePatchTaskMutation,
  usePostTasksFilesMutation,
  useDeleteTaskFileMutation,
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
  usePostOffersMutation,
  useGetUserOffersQuery,
  useGetAnotherOffersQuery,
  usePatchOffersMutation,
  useDeleteOffersMutation,
  useDeleteInvitationMutation,
  usePostITTaskMemberMutation,
  useDeleteITTaskMemberMutation,
  usePatchITTaskMemberMutation,
  useGetCompressRateQuery,
  useGetMeasuresQuery,
} = tasksAPI;
