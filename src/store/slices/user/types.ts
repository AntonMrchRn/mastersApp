import { Progresses } from '@/types/fileManager';

type InitialState = {
  isPhoneEditing: boolean;
  isEmailEditing: boolean;
  isActivePhoneTimer: boolean;
  isActiveEmailTimer: boolean;
  isApprovalNotificationShown: boolean;
  phoneTimeout: null | { timeout: number };
  emailTimeout: null | { timeout: number };
  progresses: Progresses;
};

export type { InitialState };
