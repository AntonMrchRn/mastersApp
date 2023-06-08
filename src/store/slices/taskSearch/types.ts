import { Error } from '@/types/error';

type InitialState = {
  list: [] | undefined;
  tableNames: [];
  loadingNames: boolean;
  loadingList: boolean;
  errorList: object | null | Error;
  errorNames: object | null | Error;
};

export type { InitialState };
