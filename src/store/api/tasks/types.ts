import { File } from '@/types/fileManager';
import {
  OutlayStatusType,
  RoleType,
  TaskSetType,
  TaskType,
} from '@/types/task';

type Material = {
  ID?: number;
  count: number;
  measure: string;
  name: string;
  price: number;
  roleID: RoleType;
  canDelete?: boolean;
  localSum?: string;
};
type Service = {
  ID?: number;
  categoryID: number;
  categoryName?: string;
  count?: number;
  description: string;
  measureID: number;
  name: string;
  price: number;
  roleID: RoleType;
  setID: TaskSetType;
  sum?: number;
  materials?: Material[];
  measureName?: string;
  canDelete?: boolean;
  localSum?: string;
  serviceID?: number;
  taskID?: number;
};
type Executor = {
  ID: number;
  email?: string;
  entityTypeID?: number;
  isAccept?: boolean;
  isApproved?: boolean;
  isConfirm?: boolean;
  isNDSPayer?: boolean;
  isSberPayment?: boolean;
  memberID?: number;
  name?: string;
  pname?: string;
  sname?: string;
  hasCurator?: boolean;
};
type Curator = {
  ID: number;
  entityTypeID: number;
  invitedIDs: number[];
  isAccept: boolean;
  isApproved: boolean;
  isConfirm: boolean;
  isNDSPayer: boolean;
  isSberPayment: boolean;
  memberID: number;
  name: string;
  offerID: number;
  phone: number;
  pname: string;
  sname: string;
};
type Contact = {
  name: string;
  phone: number;
  pname: string;
  position: string;
  sname: string;
};
type CountMobile = {
  id: number;
  count: number;
  label: string;
};
type Task = {
  ID?: number;
  refuseReason?: string;
  budget?: number;
  candidateIDs?: number[];
  contacts?: Contact[];
  coordinator?: {
    ID?: number;
    name?: string;
    phone?: number;
    pname?: string;
    sname?: string;
  };
  /**
   * Оффер выбранный заказчиком
   */
  winnerOffer?: Offer;
  count?: number;
  createdTime?: string;
  curators?: Curator[];
  description?: string;
  executors?: Executor[];
  executorsCount?: number;
  files?: File[];
  isCuratorAllowed?: boolean;
  isDirectum?: boolean;
  isNight?: boolean;
  isOffersPublic?: boolean;
  isOpenAccess?: boolean;
  isUrgent?: boolean;
  name?: string;
  object?: {
    ID?: number;
    name?: string;
    regionID?: number;
  };
  offerIDs?: number[];
  /**
   * Дата окончания подачи сметы
   */
  offersDeadline?: string;
  outlayStatusID?: OutlayStatusType;
  publicTime?: string;
  services?: Service[];
  setID?: number;
  stage?: string;
  statusID?: number;
  subsetID?: TaskType;
  startTime?: string;
  endTime?: string;
  endTimePlan?: string;
  webdata?: {
    IPadress?: string;
    IPgateway?: string;
    IPmask?: string;
    connectionStageName?: string;
    description?: string;
    login?: string;
    password?: string;
  };
  /**
   * Подача смет ценой выше поданной ранее
   * Если false, то можно подавать и ценой выше, главное соблюдать "Шаг цены сметы"
   */
  allowCostIncrease?: boolean;
  /**
   * Текущая стоимость сметы
   */
  currentSum?: number;
  /**
   * Шаг цены сметы
   */
  costStep?: number;
};
type Offer = {
  ID: number;
  comment: string;
  executor: Curator;
  files: File[];
  isCurator: boolean;
  isLots: boolean;
  outlayStatusID: number;
  services: Service[];
  taskID: number;
  updateTime: string;
  userID: number;
};
type GetTaskResponse = {
  count?: number;
  extraCounts?: {
    canceled: number;
    completed: number;
    matching: number;
    new: number;
    overall: number;
    summarizing: number;
    work: number;
  } | null;
  mobileCounts?: CountMobile[];
  tasks?: Task[];
};
type GetOffersResponse = {
  count: number;
  offers: Offer[];
};
type GetTaskHistoryResponse = {
  status?: string;
  endpointName?: string;
  requestId: string;
  originalArgs: string;
  startedTimeStamp: number;
  fulfilledTimeStamp: number;
  isUninitialized: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentData: Task[];
  work: number;
  taskComment: Task[];
};
type Status = {
  ID: number;
  code: string;
  description: string;
  tableName: string;
};
type GetTaskStatusesResponse = [
  {
    ID: 1;
    code: 'pending';
    description: 'Подготовка';
    tableName: 'task_status';
  },
  {
    ID: 2;
    code: 'active';
    description: 'Опубликовано';
    tableName: 'task_status';
  },
  {
    ID: 3;
    code: 'matching';
    description: 'Согласование смет';
    tableName: 'task_status';
  },
  {
    ID: 4;
    code: 'signing';
    description: 'Выполнение / Подписание документов';
    tableName: 'task_status';
  },
  {
    ID: 5;
    code: 'summarizing';
    description: 'Сдача работ';
    tableName: 'task_status';
  },
  {
    ID: 6;
    code: 'completed';
    description: 'Выполнено';
    tableName: 'task_status';
  },
  {
    ID: 7;
    code: 'cancelledByExecutor';
    description: 'Отменено исполнителем';
    tableName: 'task_status';
  },
  {
    ID: 8;
    code: 'cancelledByCustomer';
    description: 'Отменено заказчиком';
    tableName: 'task_status';
  },
  {
    ID: 9;
    code: 'paid';
    description: 'Оплачено';
    tableName: 'task_status';
  },
  {
    ID: 10;
    code: 'returned';
    description: 'Возвращено на доработку';
    tableName: 'task_status';
  },
  {
    ID: 11;
    code: 'work';
    description: 'В работе';
    tableName: 'task_status';
  },
  {
    ID: 12;
    code: 'closed';
    description: 'Закрыто';
    tableName: 'task_status';
  }
];
type ServicesCategory = {
  ID: number;
  description: string;
  isImmutable: boolean;
  name: string;
};
type GetServicesCategoriesResponse = {
  categories: ServicesCategory[];
};
type GetServicesResponse = {
  count: number;
  services: Service[];
};
type PostOffersRequest = {
  taskID: number;
  comment?: string;
  services: Service[];
};
type PatchOffersRequest = {
  taskID: number;
  ID: number;
  comment?: string;
  services: Service[];
};
export type {
  GetTaskStatusesResponse,
  Status,
  GetTaskResponse,
  Task,
  Offer,
  Executor,
  Service,
  Contact,
  Curator,
  Material,
  GetTaskHistoryResponse,
  ServicesCategory,
  GetServicesCategoriesResponse,
  GetServicesResponse,
  GetOffersResponse,
  PostOffersRequest,
  PatchOffersRequest,
};
