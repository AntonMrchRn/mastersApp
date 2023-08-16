import { File } from '@/types/fileManager';
import { ContractorStatus, RoleType } from '@/types/task';
import { UserEntityType } from '@/types/user';

type UserResponse = {
  count: number;
  users: User[];
};

type User = {
  ID: number;
  hasITAccess: boolean | null;
  hasActiveTasks: boolean | null;
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
  subStatusID?: ContractorStatus;
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
  roleID: RoleType;
  session: string;
  sessionID: number;
  setIDs: number[];
  subcontractorIDs: number[];
};

type EntityType = {
  ID: number;
  description: UserEntityType;
};

type Activity = {
  ID: number;
  code: string;
  description: string;
};

type Region = {
  ID: number;
  name: string;
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
  pname?: string;
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
  entityTypeId?: number;
  ITIN?: string;
  RRC?: string;
  entityName?: string;
  isNDSPayer?: boolean;
};

type ActivitiesEditingParams = {
  ID: number;
  setIDs: number[];
};

type RegionsEditingParams = {
  ID: number;
  regionIDs: number[];
};

type SpecialityEditingParams = {
  ID: number;
  specialty: string;
};

type UserEditingParams =
  | isSberPaymentParam
  | RegionsEditingParams
  | EntityTypeEditingParams
  | ActivitiesEditingParams
  | SpecialityEditingParams
  | BankDetailsEditingParams
  | PersonalDataEditingParams;

type AccountDeletionParams = {
  login: string;
  password: string;
};

type ContractorDeletionParams =
  | {
      kickSubs: boolean;
    }
  | {
      subcontractorIDs: number[];
    };

type CuratorDeletionParams = {
  kickCurator: boolean;
};

type TeamMemberDeletionParams =
  | ContractorDeletionParams
  | CuratorDeletionParams;

export type {
  User,
  Region,
  Activity,
  EntityType,
  UserResponse,
  UserParamsResponse,
  PhoneEditingResponse,
  ConfirmationCodeResponse,
  UserEditingParams,
  AccountDeletionParams,
  TeamMemberDeletionParams,
};
