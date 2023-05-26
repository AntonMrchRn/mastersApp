import { useDispatch } from 'react-redux';

import { storageMMKV } from '../../mmkv/storage';
import { useAppSelector } from '../../store';
import { login, logOut } from '../../store/slices/auth/actions';
import { selectAuth } from '../../store/slices/auth/selectors';

export const useCheckLogin = () => {
  const { isAuth } = useAppSelector(selectAuth);
  const dispatch = useDispatch();

  const checkLogin = () => {
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

  return { checkLogin, isAuth };
};
