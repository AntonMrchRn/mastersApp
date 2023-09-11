import { AxiosError } from 'axios';

enum ErrorCode {
  Server = 20001,
  IncorrectEmail = 20003,
  IncorrectPhone = 20004,
  IncorrectPassword = 20002,
  IncorrectVerificationCode = 20005,
  NoAccess = 20007,
  PhoneAlreadyRegistered = 8025,
  EmailAlreadyRegistered = 8021,
  TaskIsAlreadyTaken = 20008,
  NetworkError = 30001,
  NoDataFound = 8003,
}

type AxiosQueryError = {
  response: AxiosQueryErrorResponse;
};

type AxiosQueryErrorResponse = {
  status: number;
  data: Error;
};

type Error = {
  code: ErrorCode;
  message: string;
};

export { ErrorCode };
export type { Error, AxiosError, AxiosQueryError, AxiosQueryErrorResponse };
