import { AxiosProgressEvent } from 'axios';

type Progress = Omit<AxiosProgressEvent, 'event'> & {
  files: { name: string; size: number }[];
};
type Progresses = { [key: string]: Progress };
type InitialState = {
  progresses: Progresses;
};

export type { InitialState, Progress };
