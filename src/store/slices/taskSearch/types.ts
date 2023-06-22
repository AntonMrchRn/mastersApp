import { GetTaskResponce, Task } from '@/store/api/tasks/types';
import { Error } from '@/types/error';

type InitialState = {
  list: GetTaskResponce;
  data: Task[];
  tableNames: [];
  loadingNames: boolean;
  loadingList: boolean;
  errorList: Error | null;
  errorNames: null | Error;
};

export type { InitialState };
