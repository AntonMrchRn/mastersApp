import { GetTaskResponce } from '@/store/api/tasks/types';
import { Error } from '@/types/error';

type InitialState = {
  list: GetTaskResponce;
  tableNames: [];
  loadingNames: boolean;
  loadingList: boolean;
  errorList: object | null | Error;
  errorNames: object | null | Error;
};

export type { InitialState };
