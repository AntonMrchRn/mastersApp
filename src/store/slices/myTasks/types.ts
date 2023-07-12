import { GetTaskResponse, Task } from '@/store/api/tasks/types';
import { Error } from '@/types/error';

type InitialState = {
  list: GetTaskResponse;
  data?: Task[];
  tableNames: [];
  loadingList: boolean;
  loadingEndReched: boolean;
  errorList: Error | null;
  errorNames: null | Error;
};

export type { InitialState };
