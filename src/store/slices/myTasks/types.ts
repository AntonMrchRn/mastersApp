import { GetTaskResponse, Task } from '@/store/api/tasks/types';
import { Error } from '@/types/error';

type GetCommentsResponce = {
  count?: number;
  taskComment?: Comment[];
};

type Comment = {
  ID: number;
  authorTypeID?: number;
  comment?: string;
  creationTime?: string;
  isMine?: boolean;
  userID?: number;
};

type InitialState = {
  list: GetTaskResponse;
  loadingList: boolean;
  errorList: Error | null;
  data?: Task[];
  tableNames: [];
  loadingEndReched: boolean;
  errorNames: null | Error;
  comments: GetCommentsResponce;
  commentsPreview: GetCommentsResponce;
  loadingComments: boolean;
  loadingCommentsPreview: boolean;
  errorComments: null | Error;
  errorCommentsPreview: null | Error;
};

export type { InitialState, GetCommentsResponce, Comment };
