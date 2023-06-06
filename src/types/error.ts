import { AxiosError } from 'axios';

enum ErrorCode {
  Server = 20001,
  IncorrectPassword = 20002,
  IncorrectEmail = 20003,
  IncorrectPhone = 20004,
  IncorrectVerificationCode = 20005,
  NetworkError = 30001,
}

type AxiosQueryError = {
  response: AxiosQueryErrorResponse;
};

type AxiosQueryErrorResponse = {
  status: number;
  data: Error;
};

type Error = {
  code: number;
  message: string;
};

export { ErrorCode };
export type { Error, AxiosError, AxiosQueryError, AxiosQueryErrorResponse };
