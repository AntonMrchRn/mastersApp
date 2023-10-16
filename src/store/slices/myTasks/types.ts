import { GetTaskResponse, Task } from '@/store/api/tasks/types';
import { Error } from '@/types/error';

type GetSendResponse = {
  ID: number;
  authorTypeID?: number;
  comment?: string;
  creationTime?: string;
  fullname: string;
  recipientID?: number;
  roleID?: number;
  taskID?: number;
  userID?: number;
};

type GetCommentsResponse = {
  count?: number;
  taskComment?: Comment[];
};

type Comment = {
  ID: number;
  fullname: string;
  authorTypeID?: number;
  comment?: string;
  creationTime?: string;
  isMine?: boolean;
  userID?: number;
};

type InitialState = {
  list: GetTaskResponse | undefined;
  loadingList: boolean;
  errorList: Error | null;
  data?: Task[];
  tableNames: [];
  loadingEndReached: boolean;
  errorNames: null | Error;
  comments: GetCommentsResponse;
  commentsPreview: GetCommentsResponse;
  loadingComments: boolean;
  loadingSend: boolean;
  loadingCommentsPreview: boolean;
  errorComments: null | Error;
  errorCommentsPreview: null | Error;
};

export type { InitialState, GetCommentsResponse, Comment, GetSendResponse };
