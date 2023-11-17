import { File } from '@/types/fileManager';
import {
  OutlayConfirmStatus,
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
  price?: number;
  roleID: RoleType;
  localPrice?: string;
  localCount?: string;
  canDelete?: boolean;
};
type Service = {
  ID?: number;
  categoryID: number;
  categoryName?: string;
  count?: number;
  description: string;
  measureID: number;
  name: string;
  measure?: string;
  price: number;
  roleID: RoleType;
  setID: TaskSetType;
  sum?: number;
  materials?: Material[];
  measureName?: string;
  localPrice?: string;
  localCount?: string;
  serviceID?: number;
  taskID?: number;
  canDelete?: boolean;
  userID?: number;
};
type Executor = {
  ID: number;
  email?: string;
  phone?: number;
  curatorID?: number;
  entityTypeID?: number;
  isAccept?: boolean;
  isApproved?: boolean;
  isConfirm?: boolean;
  isNDSPayer?: boolean;
  isSberPayment?: boolean;
  inviterRoleID?: number;
  memberID?: number;
  name?: string;
  pname?: string;
  sname?: string;
  hasCurator?: boolean;
  isRefuse?: boolean;
  curatorName?: string;
  curatorSname?: string;
};
type Curator = {
  ID: number;
  entityTypeID: number;
  invitedIDs: number[];
  inviterRoleID: number;
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
  isRefuse: boolean;
};
type Contact = {
  name: string;
  phone: number;
  pname: string;
  position: string;
  sname: string;
  note: string;
};
type CountMobile = {
  id: number;
  count: number;
  label: string;
};
type WebData = {
  ID?: number;
  IPadress?: string;
  IPgateway?: string;
  IPmask?: string;
  connectionStage?: number;
  connectionStageName?: string;
  description?: string;
  login?: string;
  password?: string;
  objectID?: number;
};
type Coordinator = {
  ID?: number;
  name?: string;
  phone?: number;
  pname?: string;
  sname?: string;
};
type Car = {
  ID: number;
  model: string;
  number: string;
  taskID: number;
};
type Task = {
  ID?: number;
  /**
   * коэффициент оплаты исполнителя после принятия задачи
   */
  serviceMultiplier?: number;
  refuseReason?: string;
  budget?: number;
  car?: Car;
  candidateIDs?: number[];
  contacts?: Contact[];
  /**
   * Причина отмены задачи координатором
   */
  cancelReason?: string;
  coordinator?: Coordinator;
  /**
   * Оффер выбранный заказчиком
   */
  winnerOffer?: Offer;
  count?: number;
  createdTime?: string;
  curators?: Curator[];
  description?: string;
  executors?: Executor[];
  /**
   * количество исполнителей в задаче
   */
  executorsCount?: number;
  files?: File[];
  isCuratorAllowed?: boolean;
  isDirectum?: boolean;
  outlayConfirmID?: OutlayConfirmStatus;
  isNight?: boolean;
  isOffersPublic?: boolean;
  /**
   * Промежуточный статус “к Закрытию“ для:
   * Самозанятых без Сбера “Свое дело”(им нужно чек сфоткать и прислать)
   * ИП и юр.лиц, если они не прислали координатору закрывающие документы
   */
  toClose?: boolean;
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
  /**
   * тип задачи
   */
  setID?: TaskSetType;
  stage?: string;
  /**
   * Статус задачи
   */
  statusID?: number;
  /**
   * Тип задачи
   */
  subsetID?: TaskType;
  startTime?: string;
  endTime?: string;
  webdata?: WebData;
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
  clientComment?: string;
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
  tasks: Task[];
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
  },
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
  sum: number;
};
type PatchOffersRequest = {
  taskID: number;
  ID: number;
  comment?: string;
  services?: Service[];
  refuseReason?: string;
  sum?: number;
};
type PostITMembersOfferParams = {
  executorIDs: number[];
  isConfirm: boolean;
  curatorID: number;
  offerID: number;
};
type PostITTaskMemberParams = {
  taskID: number;
  members: ITTaskMember[];
};
type ITTaskMember = {
  ID?: number;
  fullname?: string;
  name?: string;
  sname?: string;
  pname?: string;
  userID?: number;
  isCurator?: boolean;
  isConfirm?: boolean;
  offerID?: number;
  isAccept?: boolean;
  invitedIDs?: number[];
  offer?: {
    taskID: number;
    isCurator: boolean;
    comment: string;
    services: Service[];
  };
};
type Measure = {
  ID: number;
  description: string;
  name: string;
  type: 'service' | 'material';
};
type GetAvailableContractorsParams = {
  taskId: number;
  curatorId: number;
};
type PatchITTaskMemberParams = {
  ID?: number;
  isRefuse?: boolean;
  userID?: number;
  isConfirm?: boolean;
  isCurator?: boolean;
  offerID?: number;
  offer?: {
    taskID: number;
    isCurator: boolean;
    services: Service[];
    comment: string;
  };
};

type GetMeasuresResponse = {
  count: number;
  measures: Measure[];
};
export type {
  WebData,
  GetTaskStatusesResponse,
  Status,
  GetTaskResponse,
  Task,
  Car,
  Offer,
  Executor,
  Service,
  Contact,
  Curator,
  Material,
  PostITTaskMemberParams,
  PatchITTaskMemberParams,
  GetAvailableContractorsParams,
  GetTaskHistoryResponse,
  ServicesCategory,
  GetServicesCategoriesResponse,
  GetServicesResponse,
  GetOffersResponse,
  PostOffersRequest,
  PatchOffersRequest,
  Measure,
  GetMeasuresResponse,
  Coordinator,
  PostITMembersOfferParams,
};
