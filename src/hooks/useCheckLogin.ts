import { useDispatch } from 'react-redux';

import { storageMMKV } from '@/mmkv/storage';
import { useAppSelector } from '@/store';
import { login, logOut } from '@/store/slices/auth/actions';
import { selectAuth } from '@/store/slices/auth/selectors';
import { RoleType } from '@/types/task';

export const useCheckLogin = () => {
  const { isAuth, user } = useAppSelector(selectAuth);
  const isExecutor =
    user &&
    [RoleType.EXTERNAL_EXECUTOR, RoleType.INTERNAL_EXECUTOR].includes(
      user.roleID
    );
  const dispatch = useDispatch();

  const checkLogin = async () => {
    try {
      const token = storageMMKV.getString('token');

      if (token) {
        dispatch(login());
      } else {
        dispatch(logOut());
      }
    } catch (e) {
      console.error("User didn't login", e);
    }
  };

  return { checkLogin, isAuth, isExecutor };
};
