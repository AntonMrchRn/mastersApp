import { Progresses } from '@/types/fileManager';

type InitialState = {
  isPhoneEditing: boolean;
  isEmailEditing: boolean;
  isLinkGenerating: boolean;
  isActiveLinkTimer: boolean;
  isActivePhoneTimer: boolean;
  isActiveEmailTimer: boolean;
  isApprovalNotificationShown: boolean;
  linkTimeout: null | { timeout: number };
  phoneTimeout: null | { timeout: number };
  emailTimeout: null | { timeout: number };
  filesOnDevice: { [index: number]: boolean } | undefined;
  progresses: Progresses;
  filesLoading:
    | { [index: number]: { isLoading: boolean; progress: number; rec: number } }
    | undefined;
};

export type { InitialState };
