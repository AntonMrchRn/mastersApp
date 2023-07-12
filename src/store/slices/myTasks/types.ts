import { GetTaskResponce, Task } from '@/store/api/tasks/types';
import { Error } from '@/types/error';

type GetCommentsResponce = {
  count: number;
  taskComment?: Comment[];
};

type Comment = {
  ID: number;
  authorTypeID: number;
  comment: string;
  creationTime: string;
  fullname: string;
  recipientID: number;
  roleID: number;
  taskID: number;
  userID: number;
};

type InitialState = {
  list: GetTaskResponce;
  loadingList: boolean;
  errorList: Error | null;
  data?: Task[];
  tableNames: [];
  loadingEndReched: boolean;
  errorNames: null | Error;
  comments: GetCommentsResponce;
  loadingComments: boolean;
  errorComments: null | Error;
};

export type { InitialState, GetCommentsResponce };
