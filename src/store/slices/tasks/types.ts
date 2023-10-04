import { Service } from '@/store/api/tasks/types';
import { Progresses } from '@/types/fileManager';

type InitialState = {
  progresses: Progresses;
  currentTaskID?: number;
  offerServices: Service[];
  offerComment: string;
  offerID: number | undefined;
  loading: boolean;
  filesOnDevice: { [index: number]: boolean } | undefined;
  error?: Error;
};

export type { InitialState };
