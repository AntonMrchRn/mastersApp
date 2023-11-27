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
  filesLoading:
    | { [index: number]: { isLoading: boolean; progress: number; rec: number } }
    | undefined;
  error?: Error;
};

export type { InitialState };
