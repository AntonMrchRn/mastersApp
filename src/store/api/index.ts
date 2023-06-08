import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig, Method } from 'axios';

import { apiHost } from '@/services/axios';
import {
  AxiosQueryError,
  AxiosQueryErrorResponse,
  ErrorCode,
} from '@/types/error';

const SERIALIZED_ERROR_STATUS = 400;

type IAxiosBaseQuery = {
  headers?: (headers: { [key: string]: string }) => { [key: string]: string };
};

type IBaseQuery = {
  url: string;
  method: Method;
  error?: AxiosQueryErrorResponse;
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
};

export const axiosBaseQuery = ({
  headers,
}: IAxiosBaseQuery): BaseQueryFn<
  IBaseQuery,
  unknown,
  AxiosQueryErrorResponse
> => {
  return async ({ url, params, method, data }) => {
    try {
      const result = await apiHost({
        url: apiHost.defaults.baseURL + url,
        method,
        ...(params && { params }),
        ...(headers && { headers: apiHost.defaults.headers }),
        ...(data && { data }),
        responseType: 'json',
      });

      return {
        data: result.data,
      };
    } catch (error) {
      const isAxiosQueryError =
        typeof error === 'object' && error != null && 'response' in error;
      const serializedError: SerializedError = error as SerializedError;
      const queryError = error as AxiosQueryError;

      return {
        error: {
          status: isAxiosQueryError
            ? queryError.response.status
            : SERIALIZED_ERROR_STATUS,
          data: {
            message: isAxiosQueryError
              ? queryError.response.data.message
              : `${serializedError.name}: ${serializedError.message}`,
            code: isAxiosQueryError
              ? queryError.response.data?.code
              : ErrorCode.NetworkError,
          },
        },
      };
    }
  };
};

export const api = createApi({
  baseQuery: axiosBaseQuery({}),
  endpoints: () => ({}),
});
