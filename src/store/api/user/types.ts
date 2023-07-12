import { File } from '@/types/fileManager';
import { UserEntityType } from '@/types/user';

type UserResponse = {
  count: number;
  users: User[];
};

type User = {
  ID: number;
  hasITAccess: boolean | null;
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
  entityTypeDescription: UserEntityType;
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

type EntityType = {
  ID: number;
  code: string;
  description: UserEntityType;
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

type BankDetailsEditingParams = {
  ID: number;
  bankID: string;
  bankName: string;
  checkingAccount: string;
  correspondingAccount: string;
};

type UserParamsResponse = {
  sberLink: string;
  tgBotTag: string;
  regionsCount: number;
};

type isSberPaymentParam = { ID: number; isSberPayment: boolean };

type EntityTypeEditingParams = {
  ID: number;
  entityTypeId: number;
  ITIN: string;
  RRC?: string;
  entityName?: string;
  isNDSPayer?: boolean;
};

type UserEditingParams =
  | PersonalDataEditingParams
  | BankDetailsEditingParams
  | isSberPaymentParam
  | EntityTypeEditingParams;

export type {
  User,
  EntityType,
  UserResponse,
  UserParamsResponse,
  PhoneEditingResponse,
  ConfirmationCodeResponse,
  UserEditingParams,
};
