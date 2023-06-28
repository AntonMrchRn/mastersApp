type UserResponse = {
  count: number;
  users: User[];
};

type User = {
  ID: number;
  name: string | null;
  sname: string | null;
  pname: string | null;
  email: string | null;
  specialty: string | null;
  entityName: string | null;
  curatorID: number | null;
  entityAddress: string | null;
  leaderName: string | null;
  ITIN: string | null;
  RRC: string | null;
  simpleSign: string | null;
  checkingAccount: string | null;
  correspondingAccount: string | null;
  bankID: string | null;
  bankName: string | null;
  creationTime: string;
  entityTypeID: number;
  files: File[];
  isApproved: boolean;
  isConfirmed: boolean;
  isNDSPayer: boolean;
  isPasswordSecure: boolean;
  isSberPayment: boolean;
  isTGActive: boolean;
  isTGConnected: boolean;
  offerIDs: number[];
  phone: number | null;
  regionIDs: number[];
  roleID: number;
  session: string;
  sessionID: number;
  setIDs: number[];
  subcontractorIDs: number[];
};

type File = {
  url: string;
  name: string;
  fileID: number;
  userID: number;
  extension: string;
};

type EntityType = {
  ID: number;
  code: string;
  description: string;
};

type ConfirmationCodeResponse = {
  timeout: number;
};

type PhoneEditingResponse = {
  data: User;
};

type PersonalDataEditingParams = {
  ID: number;
  name: string;
  sname: string;
  pname: string;
};

export type {
  User,
  EntityType,
  UserResponse,
  PhoneEditingResponse,
  ConfirmationCodeResponse,
  PersonalDataEditingParams,
};
