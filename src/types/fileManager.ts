import { AxiosProgressEvent } from 'axios/index';

type Progress = Omit<AxiosProgressEvent, 'event'> & {
  files: { name: string; size: number }[];
};
type Progresses = { [key: string]: Progress };

type Controllers = { [x: string]: AbortController };

type HandleUpload = {
  formData: FormData;
  files: {
    name: string;
    size: number;
  }[];
  date: string;
  names: string[];
};

type FilesParams = {
  formData: FormData;
  files: { name: string; size: number }[];
  date: string;
  signal?: AbortSignal;
};

type File = {
  url: string;
  name: string;
  fileID: number;
  userID?: number;
  isCheck?: boolean;
  isOffer?: boolean;
  mime: string;
  extension: string;
  extensionOriginal: string;
  isApplication?: boolean;
  sizeBytes: number;
};

export type {
  File,
  Progress,
  Progresses,
  FilesParams,
  Controllers,
  HandleUpload,
};
