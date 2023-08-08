import { Service } from '@/store/api/tasks/types';
import { Progresses } from '@/types/fileManager';

type InitialState = {
  progresses: Progresses;
  currentTaskID?: number;
  offerServices: Service[];
  offerComment: string;
  offerID: number | undefined;
  loading: boolean;
  error?: Error;
};

export type { InitialState };
