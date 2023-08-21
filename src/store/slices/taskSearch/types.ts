import { GetTaskResponse, Task } from '@/store/api/tasks/types';
import { Error } from '@/types/error';

type InitialState = {
  list: GetTaskResponse;
  data?: Task[];
  tableNames: [];
  loadingNames: boolean;
  loadingList: number;
  errorList: Error | null;
  errorNames: null | Error;
};

export type { InitialState };
