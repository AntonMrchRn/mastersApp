import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AxiosHeaderValue,
  AxiosProgressEvent,
  AxiosRequestConfig,
  GenericAbortSignal,
  Method,
} from 'axios';

import { axiosInstance } from '@/services/axios/axiosInstance';
import {
  AxiosQueryError,
  AxiosQueryErrorResponse,
  ErrorCode,
} from '@/types/error';

const SERIALIZED_ERROR_STATUS = 400;

type BaseQuery = {
  url: string;
  method: Method;
  error?: AxiosQueryErrorResponse;
  data?: AxiosRequestConfig['data'];
  headers?: { [key: string]: AxiosHeaderValue };
  params?: AxiosRequestConfig['params'];
  onUploadProgress?: ((progressEvent: AxiosProgressEvent) => void) | undefined;
  signal?: GenericAbortSignal | undefined;
};

export const axiosBaseQuery = (): BaseQueryFn<
  BaseQuery,
  unknown,
  AxiosQueryErrorResponse
> => {
  return async ({
    url,
    params,
    method,
    data,
    headers,
    onUploadProgress,
    signal,
  }) => {
    try {
      const result = await axiosInstance({
        url: axiosInstance.defaults.baseURL + url,
        method,
        ...(params && { params }),
        ...(data && { data }),
        headers: { ...axiosInstance.defaults.headers, ...headers },
        responseType: 'json',
        onUploadProgress,
        signal,
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
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
