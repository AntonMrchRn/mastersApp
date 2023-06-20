type File = {
  url: string;
  name: string;
  fileID: number;
  userID: number;
  isCheck: boolean;
  isOffer: boolean;
  mime: string;
  extension: string;
  extensionOriginal: string;
  isApplication: boolean;
  sizeBytes: number;
};
type Service = {
  ID: number;
  categoryID: number;
  categoryName: string;
  count: number;
  description: string;
  measureID: number;
  name: string;
  price: number;
  roleID: number;
  setID: number;
  sum: number;
};
type Executor = {
  ID?: number;
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
  outlayStatusID?: number;
  publicTime?: string;
  services?: Service[];
  setID?: number;
  stage?: string;
  statusID?: number;
  subsetID?: number;
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
};
type GetTaskResponce = {
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
  tasks?: Task[];
};
type Status = {
  ID: number;
  code: string;
  description: string;
  tableName: string;
};
type GetTaskStatusesResponce = [
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
type PostTasksFilesRequest = {
  formData: FormData;
  files: { name: string; size: number }[];
  date: string;
};

export type {
  PostTasksFilesRequest,
  GetTaskStatusesResponce,
  Status,
  GetTaskResponce,
  Task,
  Executor,
  Service,
  File,
  Contact,
  Curator,
};
