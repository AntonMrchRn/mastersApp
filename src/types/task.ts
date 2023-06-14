import { TaskCardScreenNavigationProp } from './navigation';

type Task = {
  ID: number;
};

type ItemObject = {
  ID: number;
  name: string;
  regionID: number;
};

type CardItem = {
  navigation: TaskCardScreenNavigationProp;
  object: ItemObject;
  startTime?: string;
  endTimePlan?: string;
  name?: string;
  description?: string;
  statusID?: number;
  isUrgent?: boolean;
  isNight?: boolean;
};

export type { Task, CardItem };
