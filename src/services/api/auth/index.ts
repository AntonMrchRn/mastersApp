import { axiosInstance } from '@/services/axios/axiosInstance';
import {
  RecoveryPasswordResponse,
  RestorePasswordParams,
  UserAuthParams,
  UserAuthResponse,
} from '@/store/slices/auth/types';

export class AuthAPI {
  static async fetchUserAuth({
    phoneNumber,
    email,
    password,
    isPhoneAuth,
  }: UserAuthParams): Promise<UserAuthResponse> {
    const { data } = await axiosInstance.post('login?isMobile=true', {
      login: isPhoneAuth ? phoneNumber : email,
      password,
    });

    return data;
  }

  static async recoveryPassword({
    phoneNumber,
    email,
    password,
    isPhoneAuth,
  }: UserAuthParams): Promise<RecoveryPasswordResponse> {
    const { data } = await axiosInstance.patch('me/password', {
      ...(isPhoneAuth ? { phone: Number(phoneNumber) } : { email }),
      password,
    });

    return data;
  }

  static async restorePassword({ password, value }: RestorePasswordParams) {
    const { data } = await axiosInstance.patch('me/password', {
      code: value,
      password,
    });

    return data;
  }
}
